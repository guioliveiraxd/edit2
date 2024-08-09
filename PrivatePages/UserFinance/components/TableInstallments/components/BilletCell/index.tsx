import Loading from '../../../../../../../components/Atoms/Loading';
import { PAYMENT_METHODS_ENUM } from '../../../CardPurchase/constants/paymentMethodsEnum';
import { PAYMENT_STATUS_ENUM } from './constants/paymentStatus';
import * as S from './styles';
import { BilletCellProps } from './types';
import { TiCancel } from 'react-icons/ti';

const BilletCell = ({ item, loading, billetClick, credCardClick }: BilletCellProps) => {
  const isInstallmentBillet =
    item.method === PAYMENT_METHODS_ENUM.BILLET_SUB || item.method === PAYMENT_METHODS_ENUM.BILLET;
  const installmentBilletPending =
    item.status === PAYMENT_STATUS_ENUM.NOTPAID ||
    item.status === PAYMENT_STATUS_ENUM.ERROR_SUBSCRIPTION;
  const isInstallmentCredCard = item.method === PAYMENT_METHODS_ENUM.CREDCARD_SUB;
  const isInstallmentPendent =
    item.status === PAYMENT_STATUS_ENUM.NOTPAID ||
    item.status === PAYMENT_STATUS_ENUM.WAITING_PAYMENT;

  const handleInstallmentBilletAction = () => {
    billetClick(item.installmentid);
  };

  const handleInstallmentCredCardAction = () => {
    credCardClick(item.installmentid);
  };

  return loading.running && loading.installment === item.installmentid ? (
    <S.LoadingContainer>
      <Loading size={1} />
    </S.LoadingContainer>
  ) : (
    <S.StyledTdContent>
      {item.status === PAYMENT_STATUS_ENUM.WAITING_PAYMENT && isInstallmentBillet ? (
        !item?.boleto_url || item?.boleto_url === ' ' ? (
          <S.TdTextContent onClick={handleInstallmentBilletAction}>GERAR BOLETO</S.TdTextContent>
        ) : (
          <S.TdTextLinkContent target="_blank" href={item.boleto_url} rel="noreferrer">
            VISUALIZAR BOLETO
          </S.TdTextLinkContent>
        )
      ) : installmentBilletPending && item?.boleto_url && isInstallmentBillet ? (
        <S.TdTextContent onClick={handleInstallmentBilletAction}>GERAR BOLETO</S.TdTextContent>
      ) : item.status !== PAYMENT_STATUS_ENUM.WAITING_REPASS &&
        isInstallmentPendent &&
        isInstallmentCredCard ? (
        <S.TdTextContent onClick={handleInstallmentCredCardAction}>PAGAR</S.TdTextContent>
      ) : item.status === PAYMENT_STATUS_ENUM.PAID ||
        item.status === PAYMENT_STATUS_ENUM.WAITING_REPASS ? (
        <S.TdTextContent status={PAYMENT_STATUS_ENUM.PAID}>PAGO</S.TdTextContent>
      ) : item.status === PAYMENT_STATUS_ENUM.CANCELED ? (
        <TiCancel />
      ) : null}
    </S.StyledTdContent>
  );
};

export default BilletCell;
