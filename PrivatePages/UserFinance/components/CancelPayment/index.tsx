import { useState, useRef, useCallback } from 'react';
import { IoClose } from 'react-icons/io5';

import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import Loading from '../../../../../components/Atoms/Loading';
import Button from '../../../../../components/Atoms/Button';

import * as S from './styles';
import { CancelPaymentProps } from './types';
import getValidationErrors from '../../../../../utils/getValidationErrors';
import api from '../../../../../services/api';
import { useAuth } from '../../../../../hooks/auth';

const CancelPayment: React.FC<CancelPaymentProps> = ({
  onClose,
  data: { transactionid, cartid },
}) => {
  const [loading, setIsLoading] = useState(false);
  const { user } = useAuth();

  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(async () => {
    setIsLoading(true);
    try {
      const saveBody = {
        userid: user.userid,
        transactionid: transactionid,
        cartid: cartid,
      };

      const response = await api.post<string>('user/myproducts/payments/cancel', saveBody);

      if (response.data === 'OK') {
        window.alert('Compra Cancelada com Sucesso!');
        onClose();
      } else if (response.data === 'ERROR') {
        window.alert('Ocorreu um erro ao salvar, por favor, tente novamente.');
        onClose();
      }
    } catch (err) {
      window.alert('Ocorreu um erro ao salvar, por favor, tente novamente.');

      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);
        formRef.current?.setErrors(errors);
      }
    } finally {
      setIsLoading(false);
    }
  }, [onClose, user.userid, transactionid, cartid]);

  return (
    <S.Container>
      <S.CloseModalButton onClick={onClose}>
        <IoClose color="grey" size={32} />
      </S.CloseModalButton>
      <S.HeaderContainer>
        <S.Title> Cancelar Compra </S.Title>
      </S.HeaderContainer>

      {loading ? (
        <S.LoadingContainer>
          <Loading />
        </S.LoadingContainer>
      ) : (
        <>
          <S.Row>
            <S.FormStyled
              ref={formRef}
              onSubmit={handleSubmit}
              className="form big"
              autoComplete="off"
            >
              <p>Deseja realmente cancelar sua compra?</p>

              <div>
                <Button onClick={onClose} type="button">
                  {loading ? <Loading size={2} /> : 'Cancelar'}
                </Button>
                <Button state="danger" type="submit">
                  {loading ? <Loading size={2} /> : 'Sim'}
                </Button>
              </div>
            </S.FormStyled>
          </S.Row>
        </>
      )}
    </S.Container>
  );
};

export default CancelPayment;
