import { TransactionPurchase } from '../../constants/models/transaction.types';
import { INSTALLMENT_STATUS_ENUM } from '../../constants/statusEnum';

export interface TableInstallmentsProps {
  data: TransactionPurchase;
}

export type InstallmentStatusKeys = keyof typeof INSTALLMENT_STATUS_ENUM;
