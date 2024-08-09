import { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../../hooks/auth";
import { SchoolLevel, SchoolLiveClasses } from "../../../models/SchoolModels";
import api from "../../../services/api";
import DefaultView from "./DefaultView";

export interface DetailsLive {
  description: string;
  levelid: string;
  position: number;
  profileid: string;
  schoolid: string;
  subjectid: string;
  title: string;
  visibility: string;
}

const LiveClasses = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [category, setCategory] = useState<DetailsLive[]>();
  const [defaultVideos, setDefaultVideos] = useState<SchoolLiveClasses[]>();
  const [liveClaVimeo, setLiveClaVimeo] = useState<SchoolLiveClasses[]>();
  const [filters, setFilters] = useState<any>([]);
  const [schoolClass, setSchoolClass] = useState<SchoolLiveClasses[]>();
  const [schoolLevel, setSchoolLevel] = useState<SchoolLevel[]>();
  const { user } = useAuth();
  const [isMobileModalVideo, setIsMobileModalVideo] = useState(false);

  let history = useHistory();

  async function getInformationRequest(item: string) {
    setIsLoading(true);

    const response1 = await api.get(
      `/school/live/level/subject?schoolid=${user.schoolid}&levelid=${item}&userid=${user.userid}`
    );
    const response2 = await api.get(
      `/school/live/level/subject/class?schoolid=${user.schoolid}&levelid=${item}&subjectid=AoVivo&userid=${user.userid}`
    );
    const response3 = await api.get(
      `/school/live/level/subject/class?schoolid=${user.schoolid}&levelid=${item}&subjectid=Reuni%C3%B5es&userid=${user.userid}`
    );
    const response4 = await api.get(
      `/school/live/level/teacher?schoolid=${user.schoolid}`
    );

    setCategory(response1.data);
    setSchoolClass(response2.data);
    setLiveClaVimeo(response3.data);
    setSchoolLevel(response4.data);
    setIsLoading(false);
  }

  const handleCourseClass = async (item: any) => {
    if (user.profileid === "Teacher") {
      const path = window.location.pathname.split("/")[2];
      const { data } = await api.get(
        `/school/live/level/subject/class?schoolid=${user.schoolid}&levelid=${path}&subjectid=${item.value}&userid=${user.userid}`
      );
      setLiveClaVimeo(data);
      setFilters(data);
      setDefaultVideos(data);
    } else {
      const { data } = await api.get(
        `/school/live/level/subject/class?schoolid=${user.schoolid}&levelid=${user.levelid}&subjectid=${item.value}&userid=${user.userid}`
      );
      setLiveClaVimeo(data);
      setFilters(data);
      setDefaultVideos(data);
    }
  };

  const handleLevelId = async (item: SchoolLevel) => {
    history.push(`/liveclasses/${item.levelid}`);
    getInformationRequest(item.levelid);
  };

  const handleFilter = useCallback(
    (item: any) => {
      if (defaultVideos === undefined) {
        return;
      }

      const filteredVideos = defaultVideos.filter(
        (liveClaVimeo) => liveClaVimeo.filter === item.value && liveClaVimeo
      );

      if (item.value && item.value !== "" && item.value !== " ") {
        setLiveClaVimeo(filteredVideos);
      }
    },
    [liveClaVimeo, defaultVideos]
  );

  const handleIsMobileModalVideo = useCallback(() => {
    setIsMobileModalVideo((state) => !state);
  }, []);

  useEffect(() => {
    user.profileid === "Teacher" &&
      history.push(
        `/liveclasses/${user.levelid !== " " ? user.levelid : "2Ano"}`
      );
    const paramter = user.levelid !== " " ? user.levelid : "2Ano";
    getInformationRequest(paramter);
  }, []);

  return (
    <>
      <DefaultView
        detailsLiveOptions={category}
        filter={filters}
        couseList={liveClaVimeo}
        handleFilter={handleFilter}
        isLoading={isLoading}
        schoolClass={schoolClass}
        schoolLevel={schoolLevel}
        handleCourseClass={handleCourseClass}
        handleLevelId={handleLevelId}
        isMobileModalVideo={isMobileModalVideo}
        handleIsMobileModalVideo={handleIsMobileModalVideo}
      />
    </>
  );
};

export default LiveClasses;
