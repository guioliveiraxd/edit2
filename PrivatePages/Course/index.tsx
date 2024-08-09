import React, {
  useEffect,
  useCallback,
  useState,
  useRef,
  useMemo,
} from "react";

import { useParams, useHistory } from "react-router-dom";
import { useAuth } from "../../../hooks/auth";
import { useProgress } from "../../../hooks/progress";

import { convertSecondsToHoursMinutesSeconds,   convertHoursMinutesSecondsToSeconds} from "../../../utils/functions";
import api from "../../../services/api";
import {
  CourseSeason,
  Exercise,
  Quiz,
  CourseSeasonMovie,
  Course as CourseModel,
} from "../../../models/CourseModels";
import { Notes } from "../../../models/AuthModels";

import DefaultView from "./DefaultView";
import apiV2 from "../../../services/apiV2";

interface Params {
  courseid: string;
  seasonid: string;
  movieid: string;
}

const Course: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isNoteLoading, setIsNoteLoading] = useState(false);
  const [isAddingNote, setIsAddingNote] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isLoadingInfo, setIsLoadingInfo] = useState(false);
  const [showAddNote, setShowAddNote] = useState(false);
  const [showCertificate, setShowCertificate] = useState(false);

  const [selectedVideoPosition, setSelectedVideoPosition] = useState(0);

  const [actualTime, setActualTime] = useState({
    playedSeconds: 0,
    played: 0,
    loadedSeconds: 0,
    loaded: 0,
  });

  const refTimeRunning = useRef<any>();

  const [courseDetails, setCourseDetails] = useState<CourseModel>();
  const [courseSeasons, setCourseSeasons] = useState<CourseSeason[]>([]);
  const [courseSeasonMovies, setCourseSeasonMovies] = useState<
    CourseSeasonMovie[]
  >([]);

  const [filteredCourseSeasonMovies, setFilteredCourseSeasonMovies] = useState<
    CourseSeasonMovie[]
  >([]);

  const [notes, setNotes] = useState<Notes[]>([]);

  const [quizzes, setQuizzes] = useState<Quiz[]>([]);

  const { user } = useAuth();

  const {
    setVideos: setProgressVideos,
    setProgress,
    videos: progressVideos,
  } = useProgress();

  const { push } = useHistory();
  const params = useParams();
  const { courseid } = params as Params;

  const addNoteInputRef = useRef<HTMLInputElement>(null);
  const [isMobileModalVideo, setIsMobileModalVideo] = useState(false);

  useMemo(() => {
    if (
      courseSeasonMovies.length > 0 &&
      courseSeasonMovies[selectedVideoPosition] &&
      courseSeasonMovies[selectedVideoPosition].url
    ) {
      if (actualTime.played > 0) {
        setProgress(
          courseSeasonMovies[selectedVideoPosition].url,
          actualTime.playedSeconds
        );
      }
    }
  }, [actualTime, courseSeasonMovies, selectedVideoPosition, setProgress]);

  useMemo(() => {
    if (
      courseSeasonMovies[selectedVideoPosition] &&
      courseSeasonMovies[selectedVideoPosition].notes
    ) {
      setNotes(courseSeasonMovies[selectedVideoPosition].notes);
      return courseSeasonMovies[selectedVideoPosition].notes;
    }
    return [];
  }, [selectedVideoPosition, courseSeasonMovies]);

  const stablishCourseSeasonMovieNotes = useCallback(() => {
    if (
      courseSeasonMovies[selectedVideoPosition] &&
      courseSeasonMovies[selectedVideoPosition].notes
    ) {
      setNotes(courseSeasonMovies[selectedVideoPosition].notes);
    }
  }, [courseSeasonMovies, selectedVideoPosition]);

  const handlePauseVideo = useCallback(
    async (info: any) => {
      if (mounted && info && info.seconds) {
        const body = {
          courseid: courseSeasonMovies[selectedVideoPosition].courseid,
          seasonid: courseSeasonMovies[selectedVideoPosition].seasonid,
          movieid: courseSeasonMovies[selectedVideoPosition].movieid,
          userid: user.userid,
          videowatched: convertSecondsToHoursMinutesSeconds(info.seconds),
          videostatus: info.percent * 100 >= 95 ? "completed" : "watching",
          exercisestatus: " ",
        };
        await api.post("/course/season/movie/user", body);
      }
    },
    [courseSeasonMovies, selectedVideoPosition, user, mounted]
  );

  const handleChangeVideo = useCallback(
    async (videoPosition: any) => {
      setIsPlaying(false);
      setSelectedVideoPosition(videoPosition);
      setIsMobileModalVideo(true);
    },
    [setSelectedVideoPosition, setIsPlaying]
  );

  const handleFinishVideo = useCallback(
    (info: any) => {
      handlePauseVideo(info);
      setIsPlaying(false);
      setActualTime({
        playedSeconds: 0,
        played: 0,
        loadedSeconds: 0,
        loaded: 0,
      });
      setTimeout(() => {
        if (selectedVideoPosition < Object.keys(progressVideos).length - 1) {
          handleChangeVideo(selectedVideoPosition + 1);
        }
      }, 250);
    },
    [handlePauseVideo, handleChangeVideo, progressVideos, selectedVideoPosition]
  );

  const handleDeleteNote = useCallback(
    async (noteId: string, index: number) => {
      setIsNoteLoading(true);
      await api.post("/course/season/movie/user/note/delete", {
        movieid: courseSeasonMovies[selectedVideoPosition].movieid,
        courseid: courseSeasonMovies[selectedVideoPosition].courseid,
        seasonid: courseSeasonMovies[selectedVideoPosition].seasonid,
        userid: user.userid,
        noteid: noteId,
      });
      const updatedNotes = notes.splice(index);
      updatedNotes.splice(index, 1);
      setNotes(updatedNotes);
      setIsNoteLoading(false);
    },
    [user, courseSeasonMovies, selectedVideoPosition, notes]
  );

  const handleEditNote = useCallback(
    async (text: string, index: number) => {
      setIsNoteLoading(true);
      const updatedNotes = notes;

      updatedNotes[index].message = text;

      const response = await api.post("/course/season/movie/user/note", {
        message: text,
        movieid: updatedNotes[index].movieid,
        courseid: updatedNotes[index].courseid,
        seasonid: updatedNotes[index].seasonid,
        userid: updatedNotes[index].userid,
        noteid: updatedNotes[index].noteid,
      });
      setIsNoteLoading(false);
      setNotes([...updatedNotes]);
    },
    [notes]
  );

  const handleAddNote = useCallback(
    async (action: string) => {
      if (action === "openModal") {
        setIsPlaying(false);
        setShowAddNote(true);
      }
      if (
        action === "submitNote" &&
        addNoteInputRef.current &&
        addNoteInputRef.current.value !== null
      ) {
        const updatedNotes = notes;
        const newNote = {
          courseid_seasonid_movieid_userid_noteid: `${
            courseSeasonMovies[selectedVideoPosition].courseid
          }+${courseSeasonMovies[selectedVideoPosition].seasonid}_${
            courseSeasonMovies[selectedVideoPosition].movieid
          }_${user.userid}_${convertSecondsToHoursMinutesSeconds(
            actualTime.playedSeconds
          )}`,
          message: addNoteInputRef.current.value,
          movieid: courseSeasonMovies[selectedVideoPosition].movieid,
          courseid: courseSeasonMovies[selectedVideoPosition].courseid,
          seasonid: courseSeasonMovies[selectedVideoPosition].seasonid,
          userid: user.userid,
          noteid: convertSecondsToHoursMinutesSeconds(actualTime.playedSeconds),
        };
        try {
          setIsAddingNote(true);
          const response = await api.post(
            "/course/season/movie/user/note",
            newNote
          );
          updatedNotes.push(newNote);
          setIsAddingNote(false);
          setNotes(updatedNotes);
          setShowAddNote(false);
        } catch (err: any) {
          setIsAddingNote(false);
          setShowAddNote(false);
        }
      }
    },
    [
      actualTime.playedSeconds,
      user?.userid,
      selectedVideoPosition,
      courseSeasonMovies,
      notes,
    ]
  );

  const handleFilter = useCallback(
    (item: any) => {
      const filteredVideos = courseSeasonMovies.filter(
        (courseSeasonMovie) =>
          courseSeasonMovie.filter === item.key && courseSeasonMovie
      );

      if (item.key !== "" && item.key !== " " && item.key) {
        setFilteredCourseSeasonMovies(filteredVideos);
        setSelectedVideoPosition(filteredVideos[0].position);
      } else {
        setFilteredCourseSeasonMovies([]);
      }
    },
    [courseSeasonMovies]
  );

  const handleIsMobileModalVideo = useCallback(() => {
    setIsMobileModalVideo(false);
    setIsPlaying(false);
  }, []);

  const filters = useMemo(() => {
    const items = courseSeasonMovies.map((item) => item.filter);
    const noRepeatedItems: Array<string> = [];
    items.map(
      (item) => !noRepeatedItems.includes(item) && noRepeatedItems.push(item)
    );

    handleFilter({ key: noRepeatedItems[0], value: noRepeatedItems[0] });

    return noRepeatedItems;
  }, [courseSeasonMovies, handleFilter]);

  const actionsBeforeRequests = useCallback(() => {
    setIsPlaying(!isPlaying);
    setActualTime({
      playedSeconds: 0,
      played: 0,
      loadedSeconds: 0,
      loaded: 0,
    });
    push(`/course/${courseid}`);
  }, [isPlaying, push, courseid]);

  const getSeasonMovies = useCallback(
    async (item: any) => {
      if (item.key) {
        setIsLoading(true);
        setSelectedVideoPosition(
          courseSeasonMovies && courseSeasonMovies[0]
            ? courseSeasonMovies[0].position
            : 0
        );
        if (!item.key) {
          setCourseSeasonMovies([]);
          return;
        }
        if (user?.userid && user?.userid !== undefined) {
          const response = await apiV2.get<CourseSeasonMovie[]>(
            `/course/season/movie?courseid=${courseid}&seasonid=${item.key}&userid=${user.userid}`
          );

          setCourseSeasonMovies(response.data);
          setProgressVideos(response.data, "course");
          setIsLoading(false);
        } else {
          const response = await apiV2.get<CourseSeasonMovie[]>(
            `/course/season/movie?courseid=${courseid}&seasonid=${item.key}`
          );

          setCourseSeasonMovies(response.data);
          setIsLoading(false);
        }
      }
    },
    [courseid, user, setProgressVideos, courseSeasonMovies]
  );

  const getCourseDetails = useCallback(async () => {
    setIsLoadingInfo(true);
    const response = await apiV2.get<CourseModel>(
      `/course/info?courseid=${courseid}&userid=${user.userid}`
    );
    setCourseDetails(response.data);
    setIsLoadingInfo(false);
  }, [courseid]);

  const getCourseSeasons = useCallback(async () => {
    setIsLoading(true);
    setCourseSeasons([]);
    const response = await api.get<CourseSeason[]>(
      `/course/season?courseid=${courseid}`
    );
    setCourseSeasons(response.data);
    setIsLoading(false);
  }, [courseid]);

  useEffect(() => {
    setMounted(true);

    if (courseSeasonMovies.length < 1) {
      getCourseSeasons();
      getCourseDetails();
    }
    stablishCourseSeasonMovieNotes();
    return () => setMounted(false);
  }, [
    getCourseSeasons,
    getCourseDetails,
    stablishCourseSeasonMovieNotes,
    courseSeasonMovies,
  ]);

  const sendCurrentlyTimeVideo = useCallback(
    (sendTimeRunning: any = refTimeRunning.current) => {
      if (sendTimeRunning) {
        const body = {
          courseid: courseSeasonMovies[selectedVideoPosition].courseid,
          seasonid: courseSeasonMovies[selectedVideoPosition].seasonid,
          movieid: courseSeasonMovies[selectedVideoPosition].movieid,
          userid: user.userid,
          videowatched: convertSecondsToHoursMinutesSeconds(
            sendTimeRunning.playedSeconds
          ),
          videostatus: (sendTimeRunning.playedSeconds *100) / convertHoursMinutesSecondsToSeconds(courseSeasonMovies[selectedVideoPosition].videoduration) > 95? "completed": "watching",
          exercisestatus: " ",
        };

        api.post("/course/season/movie/user", body);
      }
    },
    [courseSeasonMovies, selectedVideoPosition, user]
  );

  useEffect(() => {
    refTimeRunning.current = actualTime;
  }, [actualTime]);

  useEffect(() => {
    const interval = setInterval(() => {
      isPlaying && sendCurrentlyTimeVideo();
    }, 60000);

    !isPlaying && clearInterval(interval);

    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <>
      <DefaultView
        actualTime={actualTime}
        addNoteInputRef={addNoteInputRef}
        courseDetails={courseDetails}
        courseSeasons={courseSeasons}
        courseSeasonMovies={courseSeasonMovies}
        filters={filters}
        filteredCourseSeasonMovies={filteredCourseSeasonMovies}
        isAddingNote={isAddingNote}
        isLoading={isLoading}
        isLoadingInfo={isLoadingInfo}
        isPlaying={isPlaying}
        isNoteLoading={isNoteLoading}
        notes={notes}
        selectedVideoPosition={selectedVideoPosition}
        showAddNote={showAddNote}
        showCertificate={showCertificate}
        setActualTime={setActualTime}
        setShowAddNote={setShowAddNote}
        setShowCertificate={setShowCertificate}
        setIsPlaying={setIsPlaying}
        actionsBeforeRequests={actionsBeforeRequests}
        getSeasonMovies={getSeasonMovies}
        handleAddNote={handleAddNote}
        handleChangeVideo={handleChangeVideo}
        handleDeleteNote={handleDeleteNote}
        handleEditNote={handleEditNote}
        handleFilter={handleFilter}
        handleFinishVideo={handleFinishVideo}
        handlePauseVideo={handlePauseVideo}
        quizzes={quizzes}
        isMobileModalVideo={isMobileModalVideo}
        handleIsMobileModalVideo={handleIsMobileModalVideo}
      />
    </>
  );
};

export default Course;
