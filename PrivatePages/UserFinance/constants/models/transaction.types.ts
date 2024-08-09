export interface TransactionPurchase {
  transactionid: string;
  userid: string;
  amount: number;
  price: number;
  status: string;
  couponid: string;
  method: string;
  cartid: string;
  date: string;
  installments: number;
  paid_installments: number;
}
