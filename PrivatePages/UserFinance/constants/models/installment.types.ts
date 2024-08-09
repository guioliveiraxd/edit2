export interface Installments {
  status: string;
  installmentid: string;
  transactionid: string;
  userid: string;
  date: string;
  boleto_barcode: string;
  boleto_url: string;
  method: string;
  card_id: string;
  cartid: string;
  installment: number;
  tries: number;
  amount: number;
  price: number;
}
