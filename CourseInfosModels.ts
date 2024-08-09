interface PaymentInfo {
  transactionid: string;
  userid: string;
  amount: number;
  status: string;
  couponid: string;
  method: string;
  cartid: string;
  date: string;
  installments: number;
  paid_installments: number;
}

interface UserInfo {
  userid: string;
  password: string;
  email: string;
  fullname: string;
  username: string;
  cellphone: string;
  schoolpartner: string;
  documentNumber: string;
  birthdate: string;
  levelid: string;
  imageurl: string;
  roomid: string;
  profileid: string;
  schoolid: string;
  status: string;
  created_at: string;
  modified_at: string;
  codeverification: string;
  clicksign_is_signed: boolean;
  purchases: number;
}

export interface CourseInfos {
  userid: string;
  productid: string;
  type: string;
  status_payment: string;
  cartid: string;
  user_info: UserInfo;
  payment_info: PaymentInfo;
}

export interface AdminCourseInfosOutput {
  pages: number;
  payments: CourseInfos[];
}
