import { useEffect } from 'react';

import { useRequestWithPagination } from '../../../hooks/useRequestWithPagination';
import { AdminCourse } from '../../../models/CourseModels';
import { useAdminApi } from '../Admin/hooks/useAdminApi';

import CoursesTable from './components/CoursesTable';
import Button from '../../../components/Atoms/Button';
import Loading from '../../../components/Atoms/Loading';

import { Center, ListContainer } from '../../_layout/AdminLayout.styles';

const AdminCoursesInfos = () => {
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
  } = useRequestWithPagination<AdminCourse[]>([]);

  const { fetchCourses } = useAdminApi();

  const showFetchMoreBtn = !!data.length && !isLastPage;

  const handleSelectItem = () => {};

  const fetchMore = async () => {
    setIsLoading(true);
    const nextPage = currentPage + 1;
    if (nextPage > maxPage) {
      return;
    }

    const newPayments = await fetchCourses(nextPage);
    setData(oldPayments => oldPayments.concat(newPayments.data.courses));
    if (newPayments.data.pages !== maxPage) {
      setMaxPage(newPayments.data.pages);
    }
    setIsLoading(false);
    setCurrentPage(nextPage);
  };

  const fetchData = async () => {
    setIsLoading(true);
    const result = await fetchCourses(0);

    setMaxPage(result.data.pages);
    setData(result.data.courses);
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
            <CoursesTable
              data={data}
              currentIndex={currentPage}
              lastIndex={maxPage}
              onSelectItem={handleSelectItem}
            />
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

export default AdminCoursesInfos;
