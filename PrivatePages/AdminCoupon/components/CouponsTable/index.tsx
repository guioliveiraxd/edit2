import { Thead, Tr } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import { Table, Tbody, Th, Td } from '../../../../_layout/AdminLayout.styles';
import { ICuponsTable } from './types';
import { FaRegEdit, FaRegTrashAlt } from 'react-icons/fa';
import { ActionsContainer } from './styles';
import { Modal } from '../../../../../components/Atoms/Modal';
import { useState } from 'react';
import RemoveCoupon from '../RemoveCoupon';
import EditCoupon from '../EditCoupon';

const CouponsTable: React.FC<ICuponsTable> = ({ data, refreshFeth }) => {
  const [openModal, setOpenModal] = useState<any>({
    isOpen: false,
    data: {},
    type: '',
  });

  return (
    <Table breakpoint={1000}>
      <Thead>
        <Tr>
          <Th>Code</Th>
          <Th>Valor</Th>
          <Th>Desconto</Th>
          <Th>ID do Produto</Th>
          <Th>Quantidade</Th>
          <Th>Utilizados</Th>
          <Th>Actions</Th>
        </Tr>
      </Thead>
      <Tbody>
        {data &&
          data.map(item => (
            <Tr key={item.couponid}>
              <Td>{item.couponid}</Td>
              <Td>{item.value}</Td>
              <Td>{item.discount}</Td>
              <Td>{item.productid}</Td>
              <Td>{item.quantity}</Td>
              <Td>{item.usage}</Td>
              <Td>
                <ActionsContainer>
                  <FaRegTrashAlt
                    onClick={() => setOpenModal({ type: 'delete', data: item, isOpen: true })}
                  />
                  <FaRegEdit
                    onClick={() => setOpenModal({ type: 'edit', data: item, isOpen: true })}
                  />
                </ActionsContainer>
              </Td>
            </Tr>
          ))}
      </Tbody>
      <Modal isOpen={openModal.isOpen}>
        {openModal.type === 'delete' ? (
          <RemoveCoupon
            onClose={() => setOpenModal({ ...openModal, isOpen: false })}
            refreshFeth={refreshFeth}
            couponid={openModal.data.couponid}
          />
        ) : (
          <EditCoupon
            onClose={() => setOpenModal({ ...openModal, isOpen: false })}
            refreshFeth={refreshFeth}
            dataItem={openModal.data}
          />
        )}
      </Modal>
    </Table>
  );
};

export default CouponsTable;
