import { TransactionPurchase } from './constants/models/transaction.types';

type JustifyTypes = 'start' | 'end';

export interface PurchaseData {
  cartid: string;
  data: TransactionPurchase[];
}

export interface DefaultViewProps {
  purchases: TransactionPurchase[];
  onRefresh: () => void;
}

export interface HeaderColumnItemStyles {
  justify?: JustifyTypes;
}

export interface HeaderColumnWrapperItemStyles {
  align?: JustifyTypes;
}

export interface HeaderTitleItemStyles {
  total?: boolean;
}
