import { AdminCourse } from '../../../../../models/CourseModels';

export interface ICoursesTable {
  data: AdminCourse[];
  currentIndex: number;
  lastIndex: number;
  onSelectItem: (args: { cartid: string; transactionid: string }) => void;
}
