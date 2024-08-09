import CardPurchase from './components/CardPurchase';
import BackPageArrow from '../../../components/Atoms/BackPageArrow';
import * as S from './styles';
import { DefaultViewProps } from './types';
import { TransactionPurchase } from './constants/models/transaction.types';

const textOptions = {
  show: 'Visualizar Parcelas',
  hide: 'Ocultar Parcelas',
};

const DefaultView = ({ purchases, onRefresh }: DefaultViewProps) => {
  const hasPurchases = purchases && purchases.length > 0;

  if (!hasPurchases)
    return (
      <S.Container>
        <BackPageArrow backTo="/courses" textRoute="Minhas Compras" />

        <S.EmptyPurchase>Nenhuma compra realizada!</S.EmptyPurchase>
      </S.Container>
    );

  return (
    <S.Container>
      <BackPageArrow backTo="/courses" textRoute="Minhas Compras" />

      {hasPurchases &&
        purchases.map((item: TransactionPurchase, key: number) => (
          <CardPurchase onRefresh={onRefresh} key={key} data={item} textOptions={textOptions} />
        ))}
    </S.Container>
  );
};

export default DefaultView;
