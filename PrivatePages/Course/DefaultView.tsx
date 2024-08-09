import React, { useEffect } from 'react';

import { useParams } from 'react-router-dom';
import { useProgress } from '../../../hooks/progress';
import useWindowDimensions from '../../../hooks/useWindowDimensions';

import VimeoComponent from '../../../components/Atoms/VimeoComponent/CourseVimeoComponent';
import AnnotationCard from '../../../components/Atoms/AnnotationCard';
import Modal from '../../../components/Mols/Modal';
import CourseSideMenu from '../../../components/Mols/SideMenus/CourseSideMenu';
import VideoModal from '../../../components/Atoms/VimeoComponent/VideoModal';
import AnnotationModal from './Modals/AnnotationModal';
import CertificateModal from './Modals/CertificateModal';
import ModalCertificate from '../../../components/Mols/Modal/Certificate';
import PlayerAudio from './PlayerAudio';

import {
  Container,
  Content,
  VideoContainer,
  AnnotationsContainer,
  AddNoteWrapper,
  StyledButton,
  NotesWrapper,
  StyledSeparator,
  OverlayVideoModal,
} from './styles';

import { FaWindowClose } from 'react-icons/fa';
import { CourseDefaultViewProps, Params } from './types';
import { useAuth } from '../../../hooks/auth';
import apiV2 from '../../../services/apiV2';

const CourseDefaultView: React.FC<CourseDefaultViewProps> = ({
  actualTime,
  addNoteInputRef,
  courseDetails,
  courseSeasons,
  courseSeasonMovies,
  filters,
  quizzes,
  filteredCourseSeasonMovies,
  isAddingNote,
  isLoading,
  isLoadingInfo,
  isPlaying,
  isNoteLoading,
  notes,
  selectedVideoPosition,
  showAddNote,
  showCertificate,
  isMobileModalVideo,
  setActualTime,
  setIsPlaying,
  setShowAddNote,
  setShowCertificate,
  actionsBeforeRequests,
  getSeasonMovies,
  handleAddNote,
  handleChangeVideo,
  handleDeleteNote,
  handleEditNote,
  handleFilter,
  handleFinishVideo,
  handlePauseVideo,
  handleIsMobileModalVideo,
}) => {
  const params = useParams();
  const { setCurrentlyVideo } = useProgress();

  const { movieid } = params as Params;
  const url = window.location.search;
  const getQuery = new URLSearchParams(url);
  const exerciseQuery = getQuery.get('exercise');
  const movieQuery = getQuery.get('movie');
  const seasonQuery = getQuery.get('season');
  const allQuery = {
    movie: movieQuery,
    season: seasonQuery,
  };
  const windowDimensions = useWindowDimensions();

  const toggleQuizModal = (from: string): void => {
    switch (from) {
      case 'timer':
        setIsPlaying && setIsPlaying(false);

        break;
      case 'modal':
        setIsPlaying && setIsPlaying(true);

        break;
      default:
        break;
    }
  };

  useEffect(() => {
    if (courseSeasonMovies) {
      courseSeasonMovies.filter(item => {
        item.movieid === movieid && setCurrentlyVideo(item);
      });
    }
  }, [movieid]);

  const isAudio = courseSeasonMovies.filter(item => {
    if (item.videotype === 'audio') {
      return item;
    }
  });

  return (
    <Container>
      {showAddNote && (
        <Modal onClose={() => setShowAddNote(false)}>
          <AnnotationModal
            actualTime={actualTime}
            addNoteInputRef={addNoteInputRef}
            isAddingNote={isAddingNote}
            handleAddNote={handleAddNote}
            setIsPlaying={setIsPlaying}
            setShowAddNote={setShowAddNote}
          />
        </Modal>
      )}
      {showCertificate && (
        <ModalCertificate onClose={() => setShowCertificate(false)}>
          <CertificateModal setShowCertificate={setShowCertificate} courseDetails={courseDetails} />
        </ModalCertificate>
      )}
      <CourseSideMenu
        setShowCertificate={setShowCertificate}
        courseDetails={courseDetails}
        courseSeasonOptions={
          courseSeasons &&
          courseSeasons.map(courseSeason => ({
            key: courseSeason.seasonid,
            value: courseSeason.title,
          }))
        }
        firstFilter={{ key: filters[0], value: filters[0] }}
        filters={filters}
        firstItem={
          courseSeasons[0] && {
            key: courseSeasons[0].seasonid,
            value: courseSeasons[0].title,
          }
        }
        videos={
          filteredCourseSeasonMovies.length < 1
            ? courseSeasonMovies && courseSeasonMovies
            : filteredCourseSeasonMovies
        }
        selectedPosition={selectedVideoPosition}
        isLoading={isLoading}
        isLoadingInfo={isLoadingInfo}
        onFilterChage={handleFilter}
        onSeasonChange={item => {
          if (!movieid) {
            actionsBeforeRequests();
            setTimeout(() => {
              getSeasonMovies(item);
            }, 200);
          }
        }}
        onVideoChange={e => {
          if (!movieid) {
            actionsBeforeRequests();
            setTimeout(() => {
              handleChangeVideo(e);
            }, 200);
          }
        }}
      />

      <StyledSeparator type="vertical" customHeight={100} />

      {/* parte central da tela */}
      <Content>
        {/* {movieid && seasonid ? ( */}
        {movieQuery && seasonQuery && exerciseQuery ? (
          <>
            <VideoModal
              // actualTime={courseSeasonMovies}
              currentlyCourse={courseSeasonMovies}
              quiz={quizzes[0]}
              onAction={toggleQuizModal}
              queryParams={allQuery}
            />
          </>
        ) : (
          <>
            {courseSeasonMovies[0]?.videotype === 'audio' ? (
              <PlayerAudio
                isAudio={isAudio}
                isLoading={isLoading}
                selectedPosition={selectedVideoPosition}
              />
            ) : (
              <>
                <VideoContainer
                  style={
                    windowDimensions && windowDimensions.width < 980
                      ? {
                          display: isMobileModalVideo ? 'flex' : 'none',
                        }
                      : {}
                  }
                >
                  {courseSeasonMovies.length > 0 && (
                    <OverlayVideoModal>
                      <>
                        <FaWindowClose className="close_video" onClick={handleIsMobileModalVideo} />
                        <VimeoComponent
                          large={notes.length < 1}
                          url={
                            courseSeasonMovies[selectedVideoPosition] &&
                            courseSeasonMovies[selectedVideoPosition].urlvertical &&
                            windowDimensions &&
                            windowDimensions.width < 980
                              ? courseSeasonMovies[selectedVideoPosition].urlvertical
                              : courseSeasonMovies[selectedVideoPosition].url
                          }
                          video={courseSeasonMovies.find(
                            video => video.position === selectedVideoPosition && video,
                          )}
                          // isLoading={isLoading}
                          isPlaying={
                            windowDimensions && windowDimensions.width < 980 ? false : isPlaying
                          }
                          setIsPlaying={setIsPlaying}
                          actualTime={actualTime}
                          setActualTime={!showAddNote && setActualTime}
                          onPause={handlePauseVideo}
                          onFinish={handleFinishVideo}
                          quizzes={quizzes}
                        />
                      </>
                    </OverlayVideoModal>
                  )}
                </VideoContainer>
                <AnnotationsContainer hasNotes={notes.length > 0}>
                  {courseSeasonMovies[selectedVideoPosition] &&
                    courseSeasonMovies[selectedVideoPosition]?.urlfiles && (
                      <h3 className="support_material">
                        <a
                          href={courseSeasonMovies[selectedVideoPosition]?.urlfiles}
                          target="_blank"
                          download
                          rel="noreferrer"
                        >
                          Material de Apoio
                        </a>
                      </h3>
                    )}
                  {!isLoading && courseSeasonMovies.length > 0 && (
                    <AddNoteWrapper>
                      <StyledButton noShaddow onClick={() => handleAddNote('openModal')}>
                        Adicionar Anotação
                      </StyledButton>
                    </AddNoteWrapper>
                  )}
                  <NotesWrapper className="hasVerticalScroll">
                    {notes.length > 0 &&
                      notes.map((note, index) => (
                        <AnnotationCard
                          key={note.courseid_seasonid_movieid_userid_noteid}
                          time={note.noteid}
                          index={index}
                          description={note.message}
                          onDelete={handleDeleteNote}
                          onEdit={handleEditNote}
                          isNoteLoading={isNoteLoading}
                        />
                      ))}
                  </NotesWrapper>
                </AnnotationsContainer>
              </>
            )}
          </>
        )}
      </Content>
    </Container>
  );
};

export default CourseDefaultView;
