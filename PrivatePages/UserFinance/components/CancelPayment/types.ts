import { TransactionPurchase } from '../../constants/models/transaction.types';

export interface CancelPaymentProps {
  onClose: () => void;
  data: TransactionPurchase;
}

export interface CancelPaymentData {
  userid: string;
  transactionid: string;
  cartid: string;
}
