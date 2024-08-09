import { TransactionPurchase } from '../../constants/models/transaction.types';

export interface EditPaymentProps {
  onClose: () => void;
  onRefresh: () => void;
  data: TransactionPurchase;
}

export interface InputCardProps {
  transactionid: string;
  userid: string;
  card_number: string;
  card_name: string;
  exp: string;
  cpf: string;
  cvv: string;
}
