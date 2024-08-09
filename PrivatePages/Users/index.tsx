import { useEffect } from 'react';
import { BackofficeUserInfo } from '../../../models/UserModels';
import { useAdminApi } from '../Admin/hooks/useAdminApi';
import { Center, ListContainer } from '../../_layout/AdminLayout.styles';
import UsersTable from './components/UsersTable';
import { useRequestWithPagination } from '../../../hooks/useRequestWithPagination';
import Loading from '../../../components/Atoms/Loading';
import Button from '../../../components/Atoms/Button';

const Users = () => {
  const {
    data,
    isLoading,
    isLastPage,
    currentPage,
    maxPage,
    setData,
    setIsLoading,
    setMaxPage,
    setCurrentPage,
  } = useRequestWithPagination<BackofficeUserInfo[]>([]);

  const { fetchUsers } = useAdminApi();

  const showFetchMoreBtn = !!data.length && !isLastPage;

  const fetchMore = async () => {
    setIsLoading(true);
    const nextPage = currentPage + 1;
    if (nextPage > maxPage) {
      return;
    }

    const newUsers = await fetchUsers(nextPage);
    setData(oldPayments => oldPayments.concat(newUsers.data.users));
    if (newUsers.data.pages !== maxPage) {
      setMaxPage(newUsers.data.pages);
    }
    setIsLoading(false);
    setCurrentPage(nextPage);
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const result = await fetchUsers(0);

      setMaxPage(result.data.pages);
      setData(result.data.users);
      setIsLoading(false);
    };

    fetchData();
  }, []);

  return (
    <>
      <ListContainer>
        {isLoading && data.length === 0 ? (
          <Center>
            <Loading />
          </Center>
        ) : (
          <UsersTable data={data} currentIndex={currentPage} lastIndex={maxPage} />
        )}
      </ListContainer>
      {showFetchMoreBtn && (
        <Button onClick={fetchMore} loading={isLoading}>
          Carregar mais ...
        </Button>
      )}
    </>
  );
};

export default Users;
