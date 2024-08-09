import { Installments } from '../../../../constants/models/installment.types';
import { PAYMENT_STATUS_ENUM } from './constants/paymentStatus';

export interface BilletCellProps {
  item: Installments;
  billetClick: (installmentId: string) => void;
  credCardClick: (installmentId: string) => void;
  loading: {
    installment: string;
    running: boolean;
  };
}

export interface TdTextContentStyled {
  status?: PAYMENT_STATUS_ENUM;
}
