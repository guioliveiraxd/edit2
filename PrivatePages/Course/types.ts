import { Dispatch, RefObject, SetStateAction } from 'react';
import { Course, CourseSeason, CourseSeasonMovie, Quiz } from '../../../models/CourseModels';
import { Notes } from '../../../models/AuthModels';

export interface Params {
  courseid: string;
  seasonid: string;
  movieid: string;
}

export interface CourseDefaultViewProps {
  actualTime: {
    playedSeconds: number;
    played: number;
    loadedSeconds: number;
    loaded: number;
  };
  addNoteInputRef: RefObject<HTMLInputElement>;
  courseDetails: Course | undefined;
  courseSeasons: Array<CourseSeason>;
  courseSeasonMovies: Array<CourseSeasonMovie>;
  filters: Array<string>;
  quizzes: Array<Quiz>;
  filteredCourseSeasonMovies: Array<CourseSeasonMovie>;
  isAddingNote: boolean;
  isLoading: boolean;
  isLoadingInfo: boolean;
  isNoteLoading: boolean;
  isPlaying: boolean;
  notes: Array<Notes>;
  selectedVideoPosition: number;
  showAddNote: boolean;
  showCertificate: boolean;
  isMobileModalVideo: boolean;
  setActualTime: Dispatch<SetStateAction<any>>;
  setIsPlaying: Dispatch<SetStateAction<boolean>>;
  setShowAddNote: Dispatch<SetStateAction<boolean>>;
  setShowCertificate: Dispatch<SetStateAction<boolean>>;
  actionsBeforeRequests(): void;
  getSeasonMovies(item: any): Promise<void>;
  handleAddNote(action: string): void;
  handleChangeVideo(videoPosition: any): void;
  handleDeleteNote(noteId: string, index: number): Promise<void>;
  handleEditNote(text: string, index: number): Promise<void>;
  handleFilter(item: any): void;
  handleFinishVideo(info: any): void;
  handlePauseVideo(info: any): void;
  handleIsMobileModalVideo(): any;
}
