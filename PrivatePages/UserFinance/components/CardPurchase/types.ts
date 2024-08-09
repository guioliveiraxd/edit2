import { TransactionPurchase } from '../../constants/models/transaction.types';
import { paymentMethod } from './constants/paymentMethods';

export interface CardPurchaseProps {
  data: TransactionPurchase;
  textOptions: {
    show: string;
    hide: string;
  };
  onRefresh: () => void;
}

export type PaymentMethodKeys = keyof typeof paymentMethod;
