import { useState, useRef, useCallback, useEffect } from 'react';
import { IoClose } from 'react-icons/io5';

import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import apiBackoffice from '../../../../../services/apiBackoffice';
import getValidationErrors from '../../../../../utils/getValidationErrors';

import Input from '../../../../../components/Atoms/Input';
import Loading from '../../../../../components/Atoms/Loading';
import Button from '../../../../../components/Atoms/Button';

import * as S from './styles';
import { CouponsModels } from '../../../../../models/CouponsModels';
import SelectCustom from '../../../../../components/Atoms/Select';
import { useAdminApi } from '../../../Admin/hooks/useAdminApi';
import { useRequestWithPagination } from '../../../../../hooks/useRequestWithPagination';
import { AdminCourse } from '../../../../../models/CourseModels';
import { useToast } from '../../../../../hooks/toast';
import { FormLabel } from '@material-ui/core';
import RadioBtn from '../../../../../components/Atoms/RadioBtn';
import RadioGroupCustom from '../../../../../components/Mols/RadioGroup';
import { AddCouponTypes } from './types';
import { useAuth } from '../../../../../hooks/auth';

const defaultOptionSelected = {
  value: 'all',
  label: 'Todos',
};

const initialInputValues: CouponsModels = {
  schoolid: '',
  userid: '',
  couponid: '',
  productid: '',
  discount: '',
  type: 'product',
  isuserspecific: false,
  value: undefined,
  quantity: undefined,
  usage: undefined,
};

const AddCoupon: React.FC<AddCouponTypes> = ({ onClose, refreshFeth }) => {
  const { data, isLoading, setIsLoading, setData } = useRequestWithPagination<AdminCourse[]>([]);
  const { fetchCourses } = useAdminApi();
  const { addToast } = useToast();
  const { user } = useAuth();

  const [inputValues, setInputValues] = useState(initialInputValues);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const formRef = useRef<FormHandles>(null);

  const options = [
    defaultOptionSelected,
    ...data.map(course => ({
      value: course.courseid,
      label: course.description,
    })),
  ];

  const handleInputChanges = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setInputValues({
      ...inputValues,
      [name]: value,
    });
  };

  const handleSubmit = useCallback(
    async (data: CouponsModels) => {
      setFormErrors({});
      setIsLoading(true);

      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          couponid: Yup.string()
            .required('Nome Obrigatório')
            .min(3, 'Cupom deve ter no minimo 3 caracteres'),
          productid: Yup.string().required('Selecione uma  das opções'),
          quantity: Yup.string().min(1, 'Defina a quantidade de cupons'),
          value: Yup.string().min(1, 'Defina o valor dos cupons'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const saveBody = {
          userid: user.userid,
          schoolid: user.schoolid,
          couponid: data.couponid,
          productid: data.productid,
          discount: data.discount,
          type: 'product',
          isuserspecific: false,
          value: Number(data.value),
          quantity: Number(data.quantity),
          usage: 0,
        };

        const response = await apiBackoffice.post<string>('backoffice/coupons/add', saveBody);

        if (response.data === 'OK') {
          onClose();
          refreshFeth();
        } else if (response.data === '') {
          addToast({
            title: 'Erro ao salvar, favor tente nomvamente.',
            type: 'info',
          });
          onClose();
        }
      } catch (err) {
        addToast({
          title: 'Favor, preencher todos os campos!',
          type: 'info',
        });
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);
          setFormErrors(errors);
        }
      } finally {
        setInputValues(initialInputValues);
        setIsLoading(false);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [initialInputValues, user.schoolid, user.userid],
  );

  const fetchData = async () => {
    setIsLoading(true);
    const result = await fetchCourses(0);
    setData(result.data.courses);

    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <S.Container>
      <S.CloseModalButton onClick={onClose}>
        <IoClose color="grey" size={32} />
      </S.CloseModalButton>
      <S.HeaderContainer>
        <S.Title> Novo Cupom </S.Title>
      </S.HeaderContainer>

      {isLoading ? (
        <S.LoadingContainer>
          <Loading />
        </S.LoadingContainer>
      ) : (
        <S.Row>
          <Form
            ref={formRef}
            onSubmit={handleSubmit}
            className="form big"
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              width: '100%',
            }}
            autoComplete="off"
          >
            <Input
              name="couponid"
              placeholder="Codigo do cupom"
              value={inputValues.couponid.toUpperCase()}
              onChange={e => handleInputChanges(e)}
            />
            {formErrors?.couponid && <S.ErrorMessage>{formErrors?.couponid}</S.ErrorMessage>}

            <Input
              name="quantity"
              placeholder="Quantidade de cupons"
              value={inputValues.quantity as number}
              onChange={e => handleInputChanges(e)}
              pattern="[0-9]*"
              type="number"
            />
            {formErrors?.quantity && <S.ErrorMessage>{formErrors?.quantity}</S.ErrorMessage>}

            <Input
              name="value"
              placeholder="Valor do cupom"
              value={inputValues.value as number}
              onChange={e => handleInputChanges(e)}
              pattern="[0-9]*"
              type="number"
            />
            {formErrors?.value && <S.ErrorMessage>{formErrors?.value}</S.ErrorMessage>}

            <SelectCustom
              options={options}
              name="productid"
              placeholder="Selecione o produto"
              isLoading={isLoading}
            />
            {formErrors?.productid && <S.ErrorMessage>{formErrors?.productid}</S.ErrorMessage>}

            <S.GroupedRadiosWrapper>
              <FormLabel
                style={{
                  color: '#808080',
                  fontWeight: 'normal',
                }}
                id="discount-label"
              >
                Tipo de desconto:
              </FormLabel>
              <RadioGroupCustom arialabelledby="discount-label" defaultValue="%" name="discount">
                <RadioBtn value="%" label="%" />
                <RadioBtn value="$" label="R$" />
              </RadioGroupCustom>
            </S.GroupedRadiosWrapper>

            <S.GroupedRadiosWrapper>
              <FormLabel
                style={{
                  color: '#808080',
                  fontWeight: 'normal',
                }}
                id="isuserspecific-label"
              >
                Usuário especifico?
              </FormLabel>
              <RadioGroupCustom
                arialabelledby="isuserspecific-label"
                defaultValue="false"
                name="isuserspecific"
              >
                <RadioBtn value="false" label="Nāo" />
                {/* FUTURE TO ADD ANOTHER OPTION  */}
                {/* <RadioBtn value="true" label="Sim" /> */}
              </RadioGroupCustom>
            </S.GroupedRadiosWrapper>

            <div style={{ paddingBottom: '30px' }}>
              <Button type="submit">{isLoading ? <Loading size={2} /> : 'Salvar'}</Button>
            </div>
          </Form>
        </S.Row>
      )}
    </S.Container>
  );
};

export default AddCoupon;
