import { useEffect } from 'react';

import { useRequestWithPagination } from '../../../hooks/useRequestWithPagination';
import { useAdminApi } from '../Admin/hooks/useAdminApi';

import CoursesTable from './components/CoursesTable';
import Button from '../../../components/Atoms/Button';
import Loading from '../../../components/Atoms/Loading';

import { Center, ListContainer } from '../../_layout/AdminLayout.styles';
import { useLocation } from 'react-router-dom';
import { CourseInfos } from '../../../models/CourseInfosModels';

const AdminCourseInfo = () => {
  const {
    data,
    currentPage,
    maxPage,
    isLoading,
    isLastPage,
    setIsLoading,
    setData,
    setMaxPage,
    setCurrentPage,
  } = useRequestWithPagination<CourseInfos[]>([]);

  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const productid = query.get('productid') ?? '';

  const { fetchCourseInfo } = useAdminApi();

  const showFetchMoreBtn = !!data?.length && !isLastPage;

  const fetchMore = async () => {
    setIsLoading(true);
    const nextPage = currentPage + 1;
    if (nextPage > maxPage) {
      return;
    }

    const newCourseInfos = await fetchCourseInfo(nextPage, productid);
    setData(oldCourseInfos => oldCourseInfos.concat(newCourseInfos.data.payments));
    if (newCourseInfos.data.pages !== maxPage) {
      setMaxPage(newCourseInfos.data.pages);
    }

    setIsLoading(false);
    setCurrentPage(nextPage);
  };

  const fetchData = async () => {
    setIsLoading(true);
    const result = await fetchCourseInfo(maxPage, productid);

    setMaxPage(0);
    // setMaxPage(result.data.pages);
    setData(result.data.payments);
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
            <CoursesTable data={data} currentIndex={currentPage} lastIndex={maxPage} />
          </>
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

export default AdminCourseInfo;
