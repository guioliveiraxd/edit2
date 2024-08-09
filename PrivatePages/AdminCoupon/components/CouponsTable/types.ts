import { CouponsModels } from '../../../../../models/CouponsModels';

export interface ICuponsTable {
  data: CouponsModels[];
  refreshFeth: () => void;
}
