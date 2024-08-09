import { useCallback, useEffect, useState } from 'react';
import { useAuth } from '../../../hooks/auth';
import DefaultView from './DefaultView';
import api from '../../../services/api';
import { Container, ShimmerBackPage, ShimmerPurchase } from './styles';
import { PurchaseData } from './types';

const UserFinance = () => {
  const { user } = useAuth();
  const [purchases, setPurchases] = useState<PurchaseData>({
    cartid: '',
    data: [],
  });
  const [loading, setLoading] = useState(true);

  const getPurchases = useCallback(async () => {
    try {
      setLoading(true);

      const response = await api.get(`/user/myproducts/payments?userid=${user.userid}&page=0`);
      console.log('called default req Purchases response', response);

      setPurchases(prevState => ({
        ...prevState,
        cartid: response.data.payments[0].cartid,
        data: response.data.payments,
      }));
    } catch (error) {
      console.log('error', error);
    } finally {
      setLoading(false);
    }
  }, [user.userid]);

  useEffect(() => {
    const handleFetchData = async () => {
      await getPurchases();
    };

    handleFetchData();
  }, [getPurchases]);

  return loading ? (
    <Container>
      <ShimmerBackPage />
      <ShimmerPurchase />
    </Container>
  ) : (
    <DefaultView onRefresh={getPurchases} purchases={purchases.data} />
  );
};

export default UserFinance;
