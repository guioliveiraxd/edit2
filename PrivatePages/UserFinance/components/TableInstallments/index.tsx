import * as S from './styles';
import * as RTable from 'react-super-responsive-table';
import { InstallmentStatusKeys, TableInstallmentsProps } from './types';
import { convertNumberToBRL } from '../../../../../utils/functions';
import { INSTALLMENT_STATUS_ENUM } from '../../constants/statusEnum';
import React, { useCallback, useEffect, useState } from 'react';
import api from '../../../../../services/api';
import { convertToBRLDate } from '../../../../../utils/parseToBRLDateFinanceModel';
import { useAuth } from '../../../../../hooks/auth';
import BilletCell from './components/BilletCell';
import { BilletCellProps } from './components/BilletCell/types';
import { Installments } from '../../constants/models/installment.types';
import ErrorPayment from '../ErrorPayment';
import { Modal } from '../../../../../components/Atoms/Modal';

export const formatDate = (string: string): string => {
  return new Date(string).toLocaleDateString();
};

const statusColors = {
  WAITING_PAYMENT: 'blue',
  REFUNDED: 'blue',
  PAID: 'green',
  WAITING_REPASS: 'green',
  NOTPAID: 'gray',
  ERROR_SUBSCRIPTION: 'red',
  CANCELED: 'red',
};

const TableInstallments = ({ data }: TableInstallmentsProps) => {
  const { user } = useAuth();
  const [instalments, setInstalments] = useState<Installments[]>([]);
  const [loading, setLoading] = useState<BilletCellProps['loading']>({
    installment: '',
    running: true,
  });
  const [paymentErrorState, setPaymentErrorState] = useState<boolean>(false);

  const getInstallments = useCallback(async () => {
    try {
      const response = await api.get(
        `/user/myproducts/payments/installments?cartid=${data.cartid}`,
      );

      setInstalments(response.data);
      setLoading({
        ...loading,
        running: false,
      });
    } catch (error) {
      console.log('error', error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.cartid]);

  const handleBilletClick = useCallback(
    async (installmentid: string) => {
      try {
        setLoading({
          installment: installmentid,
          running: true,
        });

        const body = {
          userid: user.userid,
          installmentid: installmentid,
        };
        const response = await api.post(
          `/user/myproducts/payments/installments/generateboleto`,
          body,
        );

        if (response.data === 'OK') {
          getInstallments();
          setLoading({
            ...loading,
            installment: '',
          });
        }
      } catch (error) {
        console.log('error', error);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [user.userid, getInstallments],
  );

  const handleCredCardClick = useCallback(
    async (installmentid: string) => {
      try {
        setLoading({
          installment: installmentid,
          running: true,
        });

        const body = {
          userid: user.userid,
          installmentid: installmentid,
        };
        const response = await api.post(`/user/myproducts/payments/installments/charge`, body);

        if (response.data === 'OK') {
          getInstallments();
          setLoading({
            ...loading,
            installment: '',
          });
        } else {
          handlePaymentError();
        }
      } catch (error) {
        console.log('error', error);
        handlePaymentError();
      } finally {
        setLoading({
          ...loading,
          installment: '',
        });
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [user.userid, getInstallments],
  );

  const handlePaymentError = () => {
    setPaymentErrorState(prevState => !prevState);
  };

  useEffect(() => {
    if (data.cartid !== '') {
      getInstallments();
    }
  }, [getInstallments, data.cartid]);

  return (
    <S.StyledTable>
      <Modal isOpen={paymentErrorState}>
        <ErrorPayment onClose={handlePaymentError} />
      </Modal>
      <RTable.Thead>
        <RTable.Tr>
          <S.StyledTd>NUMERO</S.StyledTd>
          <S.StyledTd>INFORMAÇÕES</S.StyledTd>
          <S.StyledTd>DATA</S.StyledTd>
          <S.StyledTd>VALOR</S.StyledTd>
          <S.StyledTd>STATUS</S.StyledTd>
          <S.StyledTd>AÇÕES</S.StyledTd>
        </RTable.Tr>
      </RTable.Thead>
      <RTable.Tbody>
        {instalments.map((item: Installments, key: number) => (
          <RTable.Tr key={key}>
            <S.StyledTd>{item.installment}</S.StyledTd>
            <S.StyledTd>{item.installmentid}</S.StyledTd>
            <S.StyledTd>{convertToBRLDate(item.date)}</S.StyledTd>
            <S.StyledTd>{convertNumberToBRL(item.price)}</S.StyledTd>
            <S.StyledTd>
              <span
                style={{
                  color: statusColors[item.status as InstallmentStatusKeys],
                }}
              >
                {INSTALLMENT_STATUS_ENUM[item.status as InstallmentStatusKeys]}
              </span>
            </S.StyledTd>
            <S.StyledTd>
              <BilletCell
                item={item}
                billetClick={handleBilletClick}
                credCardClick={handleCredCardClick}
                loading={loading}
              />
            </S.StyledTd>
          </RTable.Tr>
        ))}
      </RTable.Tbody>
    </S.StyledTable>
  );
};

export default TableInstallments;
