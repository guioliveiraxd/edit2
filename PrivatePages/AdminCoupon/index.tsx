import { useEffect, useState } from 'react';
import { FaPlus } from 'react-icons/fa';

import { useRequestWithPagination } from '../../../hooks/useRequestWithPagination';
import { useAdminApi } from '../Admin/hooks/useAdminApi';

import Button from '../../../components/Atoms/Button';
import Loading from '../../../components/Atoms/Loading';
import { Modal } from '../../../components/Atoms/Modal';

import { Center, ListContainer } from '../../_layout/AdminLayout.styles';
import CouponsTable from './components/CouponsTable';
import AddCoupon from './components/AddCoupon';
import { CouponsModels } from '../../../models/CouponsModels';

const AdminCoupon = () => {
  const { data, isLoading, setIsLoading, setData } = useRequestWithPagination<CouponsModels[]>([]);

  const { fetchCoupons } = useAdminApi();

  const [openModal, setOpenModal] = useState<boolean>(false);

  const handleModalState = () => {
    setOpenModal(prevState => !prevState);
  };

  const fetchData = async () => {
    setIsLoading(true);
    const result = await fetchCoupons();

    setData(result.data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <ListContainer>
        {isLoading && data.length === 0 ? (
          <Center>
            <Loading />
          </Center>
        ) : (
          <>
            <Button style={{ margin: '0 auto' }} onClick={handleModalState} loading={isLoading}>
              <FaPlus />
              Adicionar Novo Cupom
            </Button>
            <CouponsTable data={data} refreshFeth={fetchData} />
            <Modal isOpen={openModal}>
              <AddCoupon onClose={handleModalState} refreshFeth={fetchData} />
            </Modal>
          </>
        )}
      </ListContainer>
    </>
  );
};

export default AdminCoupon;
