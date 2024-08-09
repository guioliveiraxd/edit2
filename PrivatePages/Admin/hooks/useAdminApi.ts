import { useAuth } from '../../../../hooks/auth';
import { BannersAdmin } from '../../../../models/BannersModels';
import { AdminCourseInfosOutput } from '../../../../models/CourseInfosModels';
import { AdminCourseOutput } from '../../../../models/CourseModels';
import { OrderHistory } from '../../../../models/OrderHistory';
import { PaymentOutputDto } from '../../../../models/PaymentModels';
import { UserOutput } from '../../../../models/UserModels';
import { WalletModels } from '../../../../models/WalletModels';
import apiBackoffice from '../../../../services/apiBackoffice';

export const useAdminApi = () => {
  const { user } = useAuth();

  const subdomain = () => {
    if (process.env.NODE_ENV === 'development') {
      return `${process.env.REACT_APP_WHITELABEL_ADMIN}`;
    }

    let urlAutal = window.location.href;
    let splitUrlProd = urlAutal.split('.');
    let subdomain = splitUrlProd[0].includes('www')
      ? ['', splitUrlProd[1]]
      : splitUrlProd[0].split('//');

    return subdomain[1].toLocaleUpperCase();
  };

  const fetchPayments = (page: number) =>
    apiBackoffice.get<PaymentOutputDto>(
      `/backoffice/payment/all?schoolid=${subdomain()}&userid=${user.userid}&page=${page}`,
    );

  const fetchWallet = () =>
    apiBackoffice.get<WalletModels>(
      `/backoffice/dashboard/wallet?schoolid=${subdomain()}&userid=${user.userid}`,
    );

  const fetchOrderhistory = (args: { cartid: string; transactionid: string }) =>
    apiBackoffice.get<OrderHistory>(
      `/backoffice/orderhistory/cartid?schoolid=${subdomain()}&userid=${user.userid}&cartid=${
        args.cartid
      }&transactionid=${args.transactionid}`,
    );

  const fetchUsers = (page: number) =>
    apiBackoffice.get<UserOutput>(
      `/backoffice/user/all?schoolid=${subdomain()}&userid=${user.userid}&page=${page}`,
    );

  const fetchCourses = (page: number) =>
    apiBackoffice.get<AdminCourseOutput>(
      `/backoffice/course/all?schoolid=${subdomain()}&userid=${user.userid}&page=${page}`,
    );

  const fetchCourseInfo = (page: number, productid: string) =>
    apiBackoffice.get<AdminCourseInfosOutput>(
      `/backoffice/payment/productid?productid=${productid}&page=${page}`,
    );

  const fetchBanners = () =>
    apiBackoffice.get<BannersAdmin[]>(
      `/backoffice/banner?schoolid=${subdomain()}&userid=${user.userid}`,
    );

  const fetchSections = () =>
    apiBackoffice.get<any>(`/backoffice/section?schoolid=${subdomain()}&userid=${user.userid}`);

  const fetchCoupons = () =>
    apiBackoffice.get<any>(`/backoffice/coupons/all?schoolid=${subdomain()}`);

  return {
    fetchPayments,
    fetchWallet,
    fetchOrderhistory,
    fetchUsers,
    fetchCourses,
    fetchCourseInfo,
    fetchBanners,
    fetchSections,
    fetchCoupons,
  };
};
