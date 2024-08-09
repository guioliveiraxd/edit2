import { useState, useEffect } from "react";

import { PaymentModel } from "../../../../models/PaymentModels";
import { WalletModels } from "../../../../models/WalletModels";
import { useAdminApi } from "./useAdminApi";

export const usePaymentBusiness = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [payments, setPayments] = useState<PaymentModel[]>([]);
  const [maxPage, setMaxPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  const { fetchPayments, fetchWallet } = useAdminApi();

  const [wallet, setWallet] = useState<WalletModels>({
    available: 0,
    balance: 0,
    schoolid: "",
  });

  const fetchMorePayments = async () => {
    setIsLoading(true);
    const nextPage = currentPage + 1;
    if (nextPage > maxPage) {
      return;
    }

    const newPayments = await fetchPayments(nextPage);
    setPayments((oldPayments) => oldPayments.concat(newPayments.data.payments));
    if (newPayments.data.pages !== maxPage) {
      setMaxPage(newPayments.data.pages);
    }
    setIsLoading(false);
    setCurrentPage(nextPage);
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const _wallet = await fetchWallet();

      const _payments = await fetchPayments(currentPage);
      setIsLoading(false);
      setMaxPage(_payments.data.pages);
      setPayments(_payments.data.payments);
      setWallet(_wallet.data);
    };

    fetchData();
  }, []);

  return {
    isLoading,
    payments,
    wallet,
    fetchMorePayments,
    currentPage,
    maxPage,
  };
};
