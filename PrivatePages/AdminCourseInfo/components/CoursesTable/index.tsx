import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Thead, Tr } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import { Table, Tbody, PageCount, Th, Td } from '../../../../_layout/AdminLayout.styles';
import { ICoursesTable } from './types';
import { convertNumberToBRL } from '../../../../../utils/functions';
import { mask as masker } from 'remask';
import { PaymentStatus, PaymentMethod } from '../../../../../models/PaymentModels';

const StatsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 20px;
`;

const StatBox = styled.div<{ color: string }>`
  background-color: ${({ color }) => color};
  padding: 10px 20px;
  border-radius: 5px;
  color: white;
  font-weight: bold;
  text-align: center;
  min-width: 150px;
`;

const methodLabel: { [key in PaymentMethod]: string } = {
  credit_card: 'Cartão de Crédito',
  free: 'Grátis',
  pix: 'Pix',
  boleto_parcelado: 'Boleto Parcelado',
  boleto_subscription: 'Boleto (Recorrência)',
  credit_card_subscription: 'Cartão de Crédito (Recorrência)',
};

const CoursesTable: React.FC<ICoursesTable> = ({ data, currentIndex, lastIndex }) => {
  const [totalSales, setTotalSales] = useState<number>(0);
  const [activeSales, setActiveSales] = useState<number>(0);
  const [awaitingPayment, setAwaitingPayment] = useState<number>(0);
  const [unpaidExpired, setUnpaidExpired] = useState<number>(0);

  const calculateStats = () => {
    const total = data.length;
    const active = data.filter(
      (item) => item.status_payment === PaymentStatus.PAID
    ).length;
    const awaiting = data.filter(
      (item) => item.status_payment === PaymentStatus.WAITING_PAYMENT
    ).length;
    const unpaid = data.filter(
      (item) => item.status_payment === PaymentStatus.NOTPAID
    ).length;

    setTotalSales(total);
    setActiveSales(active);
    setAwaitingPayment(awaiting);
    setUnpaidExpired(unpaid);
  };

  useEffect(() => {
    calculateStats();
  }, [data]);

  return (
    <>
      <StatsContainer>
        <StatBox color="#4CAF50">
          Vendas Totais: {totalSales}
        </StatBox>
        <StatBox color="#2196F3">
          Vendas Ativas: {activeSales}
        </StatBox>
        <StatBox color="#FF9800">
          Aguardando Pagamento: {awaitingPayment}
        </StatBox>
        <StatBox color="#F44336">
          Não Pagas e Vencidas: {unpaidExpired}
        </StatBox>
      </StatsContainer>
      <Table breakpoint={1000}>
        <Thead>
          <Tr>
            <Th>Nome</Th>
            <Th>Email</Th>
            <Th>Tel</Th>
            <Th>Status</Th>
            <Th>Método</Th>
            <Th>Data</Th>
            <Th>Valor</Th>
            <Th>Parcelas</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.map(item => (
            <Tr key={item.cartid}>
              <Td>{item.user_info.fullname}</Td>
              <Td>{item.user_info.email}</Td>
              <Td>
                {item.user_info.cellphone && masker(item.user_info.cellphone, ['(99) 9 9999-9999'])}
              </Td>
              <Td>{item.status_payment}</Td>
              <Td>{methodLabel[item.payment_info?.method as PaymentMethod]}</Td>
              <Td>{item.payment_info?.date}</Td>
              <Td>
                {item.payment_info?.amount &&
                  convertNumberToBRL(item.payment_info.amount)}
              </Td>
              <Td>{item.payment_info?.installments}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <PageCount>
        Página {currentIndex} de {lastIndex}
      </PageCount>
    </>
  );
};

export default CoursesTable;
