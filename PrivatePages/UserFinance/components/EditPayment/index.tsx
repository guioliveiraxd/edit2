import { useState, useRef, useCallback, useEffect } from 'react';
import { IoClose } from 'react-icons/io5';

import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { mask as masker, unMask } from 'remask';
import Cards from 'react-credit-cards';
import { FiEdit } from 'react-icons/fi';
import { cpf } from 'cpf-cnpj-validator';

import { useAuth } from '../../../../../hooks/auth';
import getValidationErrors from '../../../../../utils/getValidationErrors';

import Input from '../../../../../components/Atoms/Input';
import Loading from '../../../../../components/Atoms/Loading';
import Button from '../../../../../components/Atoms/Button';

import * as S from './styles';
import apiV2 from '../../../../../services/apiV2';
import { AddressItems } from '../../../../../models/UserModels';
import { EditPaymentProps, InputCardProps } from './types';
import { PAYMENT_METHODS_ENUM } from '../CardPurchase/constants/paymentMethodsEnum';
import { paymentMethod } from '../CardPurchase/constants/paymentMethods';
import { PaymentMethodKeys } from '../CardPurchase/types';
import RadioGroupCustom from '../../../../../components/Mols/RadioGroup';
import RadioBtn from '../../../../../components/Atoms/RadioBtn';
import api from '../../../../../services/api';

const initialInputCardValues: InputCardProps = {
  transactionid: '',
  userid: '',
  card_number: '',
  card_name: '',
  exp: '',
  cpf: '',
  cvv: '',
};

const initialInputAddressValues: AddressItems = {
  address: '',
  number: '',
  city: '',
  state: '',
  neighborhood: '',
  zipcode: '',
  complement: '',
};

const EditPayment: React.FC<EditPaymentProps> = ({ onClose, onRefresh, data }) => {
  const [loading, setIsLoading] = useState(false);
  const [isAddress, setIsAddress] = useState(false);
  const [focused, setFocused] = useState();
  const [selectedMethod, setSelectedMethod] = useState(data.method);
  const [inputCardValues, setInputCardValues] = useState(initialInputCardValues);
  const [inputAddressValues, setInputAddressValues] = useState(initialInputAddressValues);
  const { user } = useAuth();
  const [userAddress, setUserAddress] = useState<AddressItems | undefined>();

  const cartId = data.cartid;
  const transactionId = data.transactionid;
  const isBillet =
    selectedMethod === PAYMENT_METHODS_ENUM.BILLET ||
    selectedMethod === PAYMENT_METHODS_ENUM.BILLET_SUB;

  const formBilletRef = useRef<FormHandles>(null);
  const formCardRef = useRef<FormHandles>(null);
  const formAddressRef = useRef<FormHandles>(null);

  const changeFocus = (e: React.FocusEvent<HTMLInputElement>): void => {
    setFocused(e.target.id as any);
  };

  const handleInputChanges = (
    e: React.ChangeEvent<HTMLInputElement>,
    formFiled?: 'card' | 'address',
  ) => {
    const { name, value } = e.target;

    if (formFiled === 'address') {
      setInputAddressValues({
        ...inputAddressValues,
        [name]: value,
      });
      return;
    }

    setInputCardValues({
      ...inputCardValues,
      [name]: value,
    });
  };

  const handleAddressSubmit = useCallback(
    async (data: any) => {
      setIsLoading(true);
      try {
        formAddressRef.current?.setErrors({});

        const schema = Yup.object().shape({
          address: Yup.string().required('Endereço Obrigatório!').min(3),
          number: Yup.string().required('Número Obrigatório!').min(1),
          city: Yup.string().required('Cidade Obrigatório!').min(3),
          state: Yup.string().required('Estado Obrigatório!').min(2),
          neighborhood: Yup.string().required('Bairro Obrigatório!').min(3),
          zipcode: Yup.string().required('CEP Obrigatório!').min(3),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const addressBody = {
          userid: user.userid,
          address: data.address,
          number: data.number,
          city: data.city,
          state: data.state,
          neighborhood: data.neighborhood,
          zipcode: data.zipcode.replace('.', ''),
          complement: data?.complement ? data.complement : '',
        };

        const response = await apiV2.post<string>('/user/address', addressBody);

        if (response.data === 'OK') {
          setIsAddress(false);
          window.alert('Endereço salvo!');
        } else if (response.data === 'ERROR') {
          window.alert('Ocorreu um erro ao salvar, por favor, tente novamente.');
        }
      } catch (err) {
        window.alert('Por favor, preencha todos os campos!');

        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formAddressRef.current?.setErrors(errors);
        }
      }
      setIsLoading(false);
    },
    [user.userid],
  );

  const handleBilletSubmit = useCallback(async () => {
    setIsLoading(true);
    try {
      formBilletRef.current?.setErrors({});

      const savePaymentBody = {
        userid: user.userid,
        transactionid: transactionId,
        cartid: cartId,
        newMethod: PAYMENT_METHODS_ENUM.BILLET_SUB,
      };

      console.log('Submited Billet', savePaymentBody);

      const response = await api.post<string>(
        'user/myproducts/payments/changemethod',
        savePaymentBody,
      );

      if (response.data === 'OK') {
        window.alert('Seção Salva!');
        onRefresh();
      } else if (response.data === 'ERROR') {
        window.alert('Ocorreu um erro ao salvar, por favor, tente novamente.');
      }
    } catch (err) {
      window.alert('Ocorreu um erro ao salvar, por favor, tente novamente.');

      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);

        formBilletRef.current?.setErrors(errors);
      }
    } finally {
      setIsLoading(false);
      onClose();
    }
  }, [user.userid, transactionId, cartId, onClose, onRefresh]);

  const handleSubmitCardSubscription = useCallback(
    async (data: InputCardProps) => {
      setIsLoading(true);

      if (userAddress === undefined) {
        window.alert('Por favor, adicione um endereço.');

        setIsLoading(false);

        return;
      }

      console.log('submit card', data);

      try {
        formCardRef.current?.setErrors({});

        const schema = Yup.object().shape({
          cpf: Yup.string().required('CPF obrigatório').min(10),
          card_number: Yup.number().required('Número do cartão obrigatório').min(13),
          card_name: Yup.string().required('Nome obrigatório').min(3),
          exp: Yup.string().required('Data de validade obrigatória').min(4),
          cvv: Yup.number().required('CVV obrigatório').min(0),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        // eslint-disable-next-line no-param-reassign
        data.cpf = unMask(data.cpf);
        // eslint-disable-next-line no-param-reassign
        data.exp = unMask(data.exp);

        const savePaymentBody = {
          userid: user.userid,
          cartid: cartId,
          transactionid: transactionId,
          newMethod: PAYMENT_METHODS_ENUM.CREDCARD_SUB,
          userfullname: user.username,
          useremail: user.email,
          user_cellphone: user.cellphone ?? '',
          user_documentNumber: user.documentNumber ?? '',
          user_birthdate: user.birthdate ?? '',
          credit_card_cpf: data.cpf,
          credit_card_name: data.card_name,
          credit_card_number: data.card_number,
          credit_card_cvv: data.cvv,
          credit_card_expiration_date: data.exp,
        };

        console.log('Submit Card', savePaymentBody);

        const response = await api.post<string>(
          'user/myproducts/payments/changemethod',
          savePaymentBody,
        );

        if (response.data === 'OK') {
          window.alert('Seu metodo pagamento foi atualizado com sucesso!');
          onRefresh();
        } else {
          window.alert('Ocorreu um erro! Por favor, tente novamente mais tarde.');
        }
      } catch (err) {
        window.alert('Por favor, preencha todas as informações do seu cartão!');

        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formCardRef.current?.setErrors(errors);
        }
      } finally {
        setIsLoading(false);
        onClose();
        setInputCardValues(initialInputCardValues);
      }
    },
    [user, userAddress, cartId, transactionId, onClose, onRefresh],
  );

  const validarCPF = (CPFparam: string): { valido: boolean; texto: string } => {
    if (cpf.isValid(CPFparam) === true) {
      return { valido: true, texto: '' };
    }
    return { valido: false, texto: 'CPF Incorreto.' };
  };

  const getAddress = useCallback(async () => {
    setIsLoading(true);
    await apiV2.get(`/user/address?userid=${user.userid}`).then(response => {
      if (response.data !== 'Not found') {
        setUserAddress(response.data);
      }

      setIsLoading(false);
    });
  }, [user.userid]);

  const handleCheckboxMethod = (method: PaymentMethodKeys) => {
    if (method === PAYMENT_METHODS_ENUM.CREDCARD) {
      setSelectedMethod(PAYMENT_METHODS_ENUM.CREDCARD);
    }

    if (method === PAYMENT_METHODS_ENUM.BILLET) {
      setSelectedMethod(PAYMENT_METHODS_ENUM.BILLET);
    }
  };

  useEffect(() => {
    getAddress();
  }, [isAddress, getAddress]);

  useEffect(() => {
    if (userAddress !== undefined) {
      setInputAddressValues({
        ...initialInputAddressValues,
        address: userAddress?.address,
        number: userAddress?.number,
        city: userAddress?.city,
        state: userAddress?.state,
        neighborhood: userAddress?.neighborhood,
        zipcode: userAddress?.zipcode,
        complement: userAddress?.complement,
      });
    }
  }, [isAddress, getAddress, userAddress]);

  return (
    <S.Container>
      <S.CloseModalButton onClick={onClose}>
        <IoClose color="grey" size={32} />
      </S.CloseModalButton>
      <S.HeaderContainer>
        <S.Title> Alterar Metodo de Pagamento </S.Title>
      </S.HeaderContainer>

      <S.Row>
        <p>Meio de Pagamento Atual: {paymentMethod[data.method as PaymentMethodKeys]}</p>
        {data.method === PAYMENT_METHODS_ENUM.CREDCARD && (
          <p>Final do Cartão: **** **** **** ****</p>
        )}
      </S.Row>
      <Form ref={formBilletRef} onSubmit={handleBilletSubmit}>
        <S.Row paddingTop={20}>
          <p>Selecionar a nova forma de pagamento:</p>
          <RadioGroupCustom
            arialabelledby="method-label"
            defaultValue={PAYMENT_METHODS_ENUM.BILLET}
            name="method"
          >
            <RadioBtn
              value={PAYMENT_METHODS_ENUM.BILLET}
              label="Boleto"
              onClick={() => handleCheckboxMethod(PAYMENT_METHODS_ENUM.BILLET)}
            />
            <RadioBtn
              value={PAYMENT_METHODS_ENUM.CREDCARD}
              label="Cartão de Crédito"
              onClick={() => handleCheckboxMethod(PAYMENT_METHODS_ENUM.CREDCARD)}
            />
          </RadioGroupCustom>
        </S.Row>
        {isBillet && (
          <S.Row
            paddingTop={20}
            style={{
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <Button type="submit" enabled={!loading} style={{ marginBottom: '1rem' }}>
              {loading ? <Loading size={1.6} /> : 'Salvar'}
            </Button>
          </S.Row>
        )}
      </Form>

      {selectedMethod === PAYMENT_METHODS_ENUM.CREDCARD && (
        <S.Row paddingTop={20}>
          {isAddress ? (
            <Form
              ref={formAddressRef}
              onSubmit={handleAddressSubmit}
              className="form big"
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: '100%',
              }}
            >
              <div className="group-info">
                <Input
                  name="zipcode"
                  placeholder="CEP"
                  style={{ width: 60 }}
                  value={masker(inputAddressValues.zipcode, ['99.999-999'])}
                  onChange={e => handleInputChanges(e, 'address')}
                  onFocus={changeFocus}
                />
                <Input
                  name="number"
                  placeholder="Número"
                  style={{ width: 60 }}
                  value={inputAddressValues.number}
                  onChange={e => handleInputChanges(e, 'address')}
                  onFocus={changeFocus}
                />
              </div>
              <Input
                name="address"
                placeholder="Rua / Avenida"
                style={{ width: 300 }}
                value={inputAddressValues.address}
                onChange={e => handleInputChanges(e, 'address')}
                onFocus={changeFocus}
              />
              <Input
                name="neighborhood"
                placeholder="Bairro"
                style={{ width: 300 }}
                value={inputAddressValues.neighborhood}
                onChange={e => handleInputChanges(e, 'address')}
                onFocus={changeFocus}
              />
              <Input
                name="city"
                placeholder="Cidade"
                style={{ width: 300 }}
                value={inputAddressValues.city}
                onChange={e => handleInputChanges(e, 'address')}
                onFocus={changeFocus}
              />
              <Input
                name="state"
                placeholder="Estado"
                style={{ width: 300 }}
                value={inputAddressValues.state}
                onChange={e => handleInputChanges(e, 'address')}
                onFocus={changeFocus}
              />
              <Input
                name="complement"
                placeholder="Complemento"
                style={{ width: 300 }}
                value={inputAddressValues.complement}
                onChange={e => handleInputChanges(e, 'address')}
                onFocus={changeFocus}
              />
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  gap: '1.5rem',
                }}
              >
                <Button type="submit" enabled={!loading}>
                  {loading ? <Loading size={1.6} /> : 'Salvar'}
                </Button>
                <Button
                  style={{
                    color: '#fff',
                    background: '#49baae',
                  }}
                  onClick={() => setIsAddress(false)}
                  type="button"
                  enabled={!loading}
                >
                  {loading ? <Loading size={1.6} /> : 'Cancelar'}
                </Button>
              </div>
              <br />
            </Form>
          ) : (
            <>
              <S.FirstColumnChangeCard style={{}}>
                <Cards
                  number={inputCardValues.card_number}
                  name={inputCardValues.card_name}
                  expiry={inputCardValues.exp}
                  cvc={inputCardValues.cvv}
                  focused={focused}
                />
                {!loading ? (
                  <S.AddressWrapper>
                    {userAddress === undefined && (
                      <Button type="button" onClick={() => setIsAddress(true)} enabled={!loading}>
                        Adicionar Endereço
                      </Button>
                    )}
                    <p>
                      Endereço:{' '}
                      {userAddress !== undefined ? (
                        <>
                          {`${userAddress?.address}, ${userAddress?.number} - ${
                            userAddress?.city
                          } ${userAddress?.state} \n CEP: ${masker(userAddress?.zipcode, [
                            '99.999-999',
                          ])}`}
                          <FiEdit onClick={() => setIsAddress(true)} />
                        </>
                      ) : (
                        'Sem endereço cadastrado.'
                      )}
                    </p>
                  </S.AddressWrapper>
                ) : (
                  <div style={{ margin: '0 auto' }}>
                    <Loading size={1.6} />
                  </div>
                )}
              </S.FirstColumnChangeCard>
              <Form
                ref={formCardRef}
                onSubmit={handleSubmitCardSubscription}
                className="form big"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
                autoComplete="off"
              >
                <Input
                  name="cpf"
                  placeholder="CPF"
                  customWidth="75%"
                  value={masker(inputCardValues.cpf, ['999.999.999-99'])}
                  onChange={e => {
                    handleInputChanges(e);
                  }}
                  onBlur={() => {
                    validarCPF(inputCardValues.cpf);
                  }}
                  onFocus={changeFocus}
                />
                <Input
                  name="card_number"
                  placeholder="Número do cartão"
                  customWidth="75%"
                  value={masker(inputCardValues.card_number, ['9999999999999999'])}
                  onChange={e => {
                    handleInputChanges(e);
                  }}
                  onFocus={changeFocus}
                  autoComplete="off"
                />
                <Input
                  name="card_name"
                  placeholder="Nome no Cartão"
                  customWidth="75%"
                  value={inputCardValues.card_name}
                  onChange={e => {
                    handleInputChanges(e);
                  }}
                  onFocus={changeFocus}
                  autoComplete="off"
                />
                <div className="group-info">
                  <Input
                    name="exp"
                    placeholder="Expiração"
                    customWidth="100%"
                    value={masker(inputCardValues.exp, ['99/99'])}
                    onChange={e => {
                      handleInputChanges(e);
                    }}
                    onFocus={changeFocus}
                    autoComplete="off"
                  />
                  <Input
                    name="cvv"
                    placeholder="CVV"
                    customWidth="100%"
                    value={masker(inputCardValues.cvv, ['999'])}
                    onChange={e => {
                      handleInputChanges(e);
                    }}
                    onFocus={changeFocus}
                    autoComplete="off"
                  />
                </div>

                <Button type="submit" enabled={!loading}>
                  {loading ? <Loading size={1.6} /> : 'Salvar'}
                </Button>
                <br />
              </Form>
            </>
          )}
        </S.Row>
      )}
    </S.Container>
  );
};

export default EditPayment;
