import React, { useState, useMemo, useEffect } from 'react';
import { Thead, Tr } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';

import {
  PaymentMethod,
  PaymentModel,
  PaymentStatus,
} from '../../../../../models/PaymentModels';
import {
  Table,
  Tbody,
  PageCount,
  Th,
  Td,
  HeaderContainer,
  HeaderText,
  IconsContainer,
  FilterInput,
} from '../../../../_layout/AdminLayout.styles';

import StatusBadge from '../StatusBadge';

export const methodLabel: { [key in PaymentMethod]: string } = {
  credit_card: 'Cartão de Crédito',
  boleto_parcelado: 'Boleto',
  credit_card_subscription: 'Cartão de Crédito (Recorrência)',
  boleto_subscription: 'Boleto (Recorrência)',
  free: 'Grátis',
  pix: 'Pix',
};

interface IPaymentsTable {
  data: PaymentModel[];
  currentIndex: number;
  lastIndex: number;
  onSelectItem: (args: { cartid: string; transactionid: string }) => void;
}

type SortKey = keyof PaymentModel | 'user_info.fullname';

const PaymentsTable: React.FC<IPaymentsTable> = ({
  data,
  currentIndex,
  lastIndex,
  onSelectItem,
}) => {
  const [originalData, setOriginalData] = useState<PaymentModel[]>([]);
  const [sortConfig, setSortConfig] = useState<{ key: SortKey; direction: string } | null>(null);
  const [filters, setFilters] = useState<{ [key in SortKey]?: string }>({});

  useEffect(() => {
    setOriginalData(data);
  }, [data]);

  const sortedData = useMemo(() => {
    if (!sortConfig) {
      return originalData;
    }

    const sortableData = [...originalData];

    sortableData.sort((a, b) => {
      const aValue = sortConfig.key === 'user_info.fullname' ? a.user_info.fullname : a[sortConfig.key];
      const bValue = sortConfig.key === 'user_info.fullname' ? b.user_info.fullname : b[sortConfig.key];

      if (aValue < bValue) {
        return sortConfig.direction === 'ascending' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });

    return sortableData;
  }, [originalData, sortConfig]);

  const filteredData = useMemo(() => {
    return sortedData.filter(item => {
      return Object.keys(filters).every(key => {
        const filterValue = filters[key as SortKey]?.toLowerCase() || '';
        const itemValue = key === 'user_info.fullname' ? item.user_info.fullname : item[key as keyof PaymentModel];
        return itemValue.toString().toLowerCase().includes(filterValue);
      });
    });
  }, [filters, sortedData]);

  const requestSort = (key: SortKey) => {
    if (sortConfig?.key === key) {
      if (sortConfig.direction === 'ascending') {
        setSortConfig({ key, direction: 'descending' });
      } else {
        setSortConfig(null); // Desmarcar ordenação e voltar ao estado original
      }
    } else {
      setSortConfig({ key, direction: 'ascending' });
    }
  };

  const getIcons = (key: SortKey) => {
    if (sortConfig?.key === key) {
      if (sortConfig.direction === 'ascending') {
        return (
          <div>
            <FaArrowUp color="red" />
            <FaArrowDown />
          </div>
        );
      } else if (sortConfig.direction === 'descending') {
        return (
          <div>
            <FaArrowUp />
            <FaArrowDown color="red" />
          </div>
        );
      }
    }
    return (
      <div>
        <FaArrowUp />
        <FaArrowDown />
      </div>
    );
  };

  const handleFilterChange = (key: SortKey, value: string) => {
    setFilters(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <>
      <Table breakpoint={1000}>
        <Thead>
          <Tr>
            <Th>
              <HeaderContainer>
                <HeaderText onClick={() => requestSort('user_info.fullname')}>
                  Usuário
                </HeaderText>
                <IconsContainer onClick={() => requestSort('user_info.fullname')}>
                  {getIcons('user_info.fullname')}
                </IconsContainer>
                <FilterInput
                  type="text"
                  placeholder="Filtrar"
                  onChange={(e) => handleFilterChange('user_info.fullname', e.target.value)}
                />
              </HeaderContainer>
            </Th>
            <Th>
              <HeaderContainer>
                <HeaderText onClick={() => requestSort('date')}>
                  Data
                </HeaderText>
                <IconsContainer onClick={() => requestSort('date')}>
                  {getIcons('date')}
                </IconsContainer>
                <FilterInput
                  type="text"
                  placeholder="Filtrar"
                  onChange={(e) => handleFilterChange('date', e.target.value)}
                />
              </HeaderContainer>
            </Th>
            <Th>
              <HeaderContainer>
                <HeaderText onClick={() => requestSort('method')}>
                  Método de Pagamento
                </HeaderText>
                <IconsContainer onClick={() => requestSort('method')}>
                  {getIcons('method')}
                </IconsContainer>
                <FilterInput
                  type="text"
                  placeholder="Filtrar"
                  onChange={(e) => handleFilterChange('method', e.target.value)}
                />
              </HeaderContainer>
            </Th>
            <Th>
              <HeaderContainer>
                <HeaderText onClick={() => requestSort('status')}>
                  Status
                </HeaderText>
                <IconsContainer onClick={() => requestSort('status')}>
                  {getIcons('status')}
                </IconsContainer>
                <FilterInput
                  type="text"
                  placeholder="Filtrar"
                  onChange={(e) => handleFilterChange('status', e.target.value)}
                />
              </HeaderContainer>
            </Th>
            <Th>
              <HeaderContainer>
                <HeaderText onClick={() => requestSort('amount')}>
                  Preço
                </HeaderText>
                <IconsContainer onClick={() => requestSort('amount')}>
                  {getIcons('amount')}
                </IconsContainer>
                <FilterInput
                  type="text"
                  placeholder="Filtrar"
                  onChange={(e) => handleFilterChange('amount', e.target.value)}
                />
              </HeaderContainer>
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {filteredData.map((item) => (
            <Tr
              key={item.transactionid}
              onClick={() =>
                onSelectItem({
                  cartid: item.cartid,
                  transactionid: item.transactionid,
                })
              }
            >
              <Td>{item.user_info.fullname}</Td>
              <Td>{item.date}</Td>
              <Td>{methodLabel[item.method]}</Td>
              <Td>
                <StatusBadge
                  type={item.status}
                  paid_installments={item.paid_installments}
                  installments={item.installments}
                  payment_method={item.method}
                />
              </Td>
              <Td>R$ {(item.amount / 100).toFixed(2)}</Td>
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

export default PaymentsTable;
