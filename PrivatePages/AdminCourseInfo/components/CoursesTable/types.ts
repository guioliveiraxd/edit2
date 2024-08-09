import { CourseInfos } from '../../../../../models/CourseInfosModels';

export interface ICoursesTable {
  data: CourseInfos[];
  currentIndex: number;
  lastIndex: number;
}
