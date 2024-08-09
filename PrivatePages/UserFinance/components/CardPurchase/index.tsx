import AccordionCustom from '../../../../../components/Atoms/Accordion';
import * as S from './styles';
import TableInstallments from '../TableInstallments';
import { convertToBRLDate } from '../../../../../utils/parseToBRLDateFinanceModel';
import { CardPurchaseProps, PaymentMethodKeys } from './types';
import React, { useState } from 'react';
import { Modal } from '../../../../../components/Atoms/Modal';
import { paymentMethod } from './constants/paymentMethods';
import { PAYMENT_METHODS_ENUM } from './constants/paymentMethodsEnum';

const EditPaymentLazy = React.lazy(() => import('../EditPayment'));
const CancelPaymentLazy = React.lazy(() => import('../CancelPayment'));

const CardPurchase = ({ data, textOptions, onRefresh }: CardPurchaseProps) => {
  const [openEditModal, setOpenEditModal] = useState<boolean>(false);
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);

  const isAbleEditActions =
    data.method !== PAYMENT_METHODS_ENUM.PIX &&
    data.method !== PAYMENT_METHODS_ENUM.BILLET &&
    data.method !== PAYMENT_METHODS_ENUM.CREDCARD &&
    data.status !== 'CANCELED';

  const handleModalEditState = () => {
    setOpenEditModal(prevState => !prevState);
  };

  const handleModalDeleteState = () => {
    setOpenDeleteModal(prevState => !prevState);
  };

  return (
    <S.Container>
      <Modal isOpen={openEditModal}>
        {<EditPaymentLazy onRefresh={onRefresh} data={data} onClose={handleModalEditState} />}
      </Modal>

      <Modal isOpen={openDeleteModal}>
        <CancelPaymentLazy data={data} onClose={handleModalDeleteState} />
      </Modal>

      <S.ContainerItem>
        <S.HeaderItem>
          <S.HeaderColumnItem justify="start">
            <S.HeaderColumnWrapperItem align="start">
              <S.HeaderTitleItem>
                Compra Realizada:{' '}
                <span style={{ textDecoration: 'underline' }}>{data.transactionid}</span>
              </S.HeaderTitleItem>
              <S.HeaderTextItem>{convertToBRLDate(data.date, true)}</S.HeaderTextItem>
            </S.HeaderColumnWrapperItem>
          </S.HeaderColumnItem>

          <S.HeaderColumnItem justify="end">
            <S.HeaderColumnWrapperItem align="end">
              <S.HeaderTextItem>
                Metodo: {paymentMethod[data.method as PaymentMethodKeys]}
              </S.HeaderTextItem>
              {isAbleEditActions && (
                <>
                  <S.HeaderTextDetailItem onClick={handleModalEditState}>
                    Editar forma de Pagamento
                  </S.HeaderTextDetailItem>
                  <S.HeaderTextDetailItem onClick={handleModalDeleteState}>
                    Cancelar Compra
                  </S.HeaderTextDetailItem>
                </>
              )}
              {data.status === 'CANCELED' && (
                <S.CanceledTagItem>
                  <p>CANCELADA</p>
                </S.CanceledTagItem>
              )}
            </S.HeaderColumnWrapperItem>
          </S.HeaderColumnItem>
        </S.HeaderItem>
        <S.DividerItem />

        {data.method !== PAYMENT_METHODS_ENUM.PIX && (
          <AccordionCustom title={textOptions} accordionId="installments">
            <TableInstallments data={data} />
          </AccordionCustom>
        )}
      </S.ContainerItem>
    </S.Container>
  );
};

export default CardPurchase;
