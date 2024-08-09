import { Notes } from './AuthModels';

export interface CourseSeason {
  courseid: string;
  courseid_seasonid: string;
  description: string;
  position: number;
  seasonid: string;
  title: string;
}

export interface CourseSeasonMovieUser {
  courseid_seasonid_movieid_userid: string;
  movieid: string;
  courseid: string;
  seasonid: string;
  userid: string;
  videostatus: string;
  videowatched: string;
}

export interface Quiz {
  answer: string;
  courseid: string;
  courseid_seasonid_movieid_quizid: string;
  movieid: string;
  options: string;
  quizid: string;
  seasonid: string;
  title: string;
  videoposition: string;
}

export interface CourseSeasonMovie {
  courseid: string;
  courseid_seasonid_movieid: string;
  courseseasonmovieuser: CourseSeasonMovieUser;
  chaturl: string;
  description: string;
  exercises: [];
  exerciseshortmessage: string;
  filter: string;
  scheduledrelease: string;
  movieid: string;
  notes: Array<Notes>;
  position: number;
  quizzes: Array<Quiz>;
  seasonid: string;
  thumb: string;
  thumburlvertical?: string;
  title: string;
  url: string;
  urlvertical?: string;
  urlfiles?: string;
  videoduration: string;
  videotype: string;
}

export interface Course {
  comingsoon: string;
  courseid: string;
  title: string;
  clicksign_is_signed: string;
  status_payment: string;
  subscription: boolean;
  subscription_installments: number;
  description: string;
  thumburl: string;
  thumburlvertical?: string;
  teaserurl: string;
  levelidlist: string;
  priority: number;
  pix_discount: string;
  pix_price: number;
  userprogress: number;
  max_installments: number;
  schoolid: string;
  prerequirement: string;
  prerequirementtitle: string;
  certificatebackground: string;
  totalhours: number;
  currenttoprankingposition: number;
  is_owner: boolean;
  is_live: boolean;
  blocked: boolean;
  price: number;
}

export interface Exercise {
  answer: string;
  contenttype: string;
  courseid: string;
  courseid_seasonid_movieid_exerciseid: string;
  exerciseid: string;
  movieid: string;
  options: string;
  position: number;
  question: string;
  questiontype: string;
  seasonid: string;
  url: string;
}

export interface AdminCourseOutput {
  pages: number;
  courses: AdminCourse[];
}

export interface AdminCourse {
  courseid: string;
  title: string;
  schoolid: string;
  description: string;
  thumburl: string;
  teaserurl: string;
  thumburlvertical: string;
  levelidlist: string; //'["Ministério"]' ;
  comingsoon: string;
  profileid: string;
  price: number;
  is_owner: boolean;
  priority: number;
  currenttoprankingposition: number;
  userprogress: number;
}
