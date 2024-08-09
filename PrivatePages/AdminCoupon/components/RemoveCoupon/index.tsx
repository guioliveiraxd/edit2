import { useCallback, useState } from 'react';
import { IoClose } from 'react-icons/io5';

import Loading from '../../../../../components/Atoms/Loading';
import Button from '../../../../../components/Atoms/Button';

import * as S from './styles';
import { useToast } from '../../../../../hooks/toast';
import { AddCouponTypes } from './types';
import apiBackoffice from '../../../../../services/apiBackoffice';

const RemoveCoupon = ({ onClose, refreshFeth, couponid }: AddCouponTypes) => {
  const { addToast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = useCallback(
    async () => {
      setIsLoading(true);

      try {
        const response = await apiBackoffice.post<string>('backoffice/coupons/delete', {
          couponid: couponid,
        });

        if (response.data === 'OK') {
          onClose();
          refreshFeth();
        } else if (response.data === '') {
          addToast({
            title: 'Erro ao deletar, favor tente nomvamente.',
            type: 'info',
          });
          onClose();
        }
      } catch (err) {
        addToast({
          title: 'Favor, tente novamente',
          type: 'info',
        });
      } finally {
        setIsLoading(false);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [couponid],
  );

  return (
    <S.Container>
      <S.CloseModalButton onClick={onClose}>
        <IoClose color="grey" size={32} />
      </S.CloseModalButton>
      <S.HeaderContainer>
        <S.Title> Excluir Cupom? </S.Title>
      </S.HeaderContainer>

      {isLoading ? (
        <S.LoadingContainer>
          <Loading />
        </S.LoadingContainer>
      ) : (
        <S.Row>
          <S.GroupedBtns>
            <Button onClick={handleDelete} customStyle="danger" type="button">
              {isLoading ? <Loading size={2} /> : 'Confirmar'}
            </Button>
            <Button onClick={onClose} customStyle="success" type="button">
              {isLoading ? <Loading size={2} /> : 'Cancelar'}
            </Button>
          </S.GroupedBtns>
        </S.Row>
      )}
    </S.Container>
  );
};

export default RemoveCoupon;
