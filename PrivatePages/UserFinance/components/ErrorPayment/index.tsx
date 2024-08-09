import { IoClose } from 'react-icons/io5';

import * as S from './styles';
import { ErrorPaymentProps } from './types';
import { MdOutlineCreditCardOff } from 'react-icons/md';

const ErrorPayment: React.FC<ErrorPaymentProps> = ({ onClose }) => {
  return (
    <S.Container>
      <S.CloseModalButton onClick={onClose}>
        <IoClose color="grey" size={32} />
      </S.CloseModalButton>
      <S.HeaderContainer>
        <S.Title> Erro de Pagamento! </S.Title>
      </S.HeaderContainer>

      <S.Row>
        <MdOutlineCreditCardOff />
        <p>Ooh não! Tivemos problemas com o seu pagamento.</p>
        <br />
        <p>Favor, tente novamente com o mesmo metodo ou altere para outra forma.</p>
      </S.Row>
    </S.Container>
  );
};

export default ErrorPayment;
