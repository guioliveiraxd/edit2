import { Thead, Tr } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import { Table, Tbody, PageCount, Th, Td } from '../../../../_layout/AdminLayout.styles';
import { ICoursesTable } from './types';
import { FaEye } from 'react-icons/fa';
import { useHistory } from 'react-router-dom';

const CoursesTable: React.FC<ICoursesTable> = ({ data, currentIndex, lastIndex }) => {
  const { push } = useHistory();

  const handleCourseInfo = (courseid: string) => () => {
    push(`/admin/course-info?productid=${courseid}`);
  };

  return (
    <>
      <Table breakpoint={1000}>
        <Thead>
          <Tr>
            <Th> </Th>
            <Th>Infos</Th>
            <Th>Titulo</Th>
            <Th>Preço</Th>
            <Th>Ranking</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.map(item => (
            <Tr key={item.courseid}>
              <Td>
                <img src={item.thumburl} width={120} alt="course-thumb" />
              </Td>
              <Td style={{ cursor: 'pointer' }} onClick={handleCourseInfo(item.courseid)}>
                <FaEye />
              </Td>
              <Td>{item.title}</Td>
              <Td>R$ {item.price.toFixed(2)}</Td>
              <Td>{item.currenttoprankingposition}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <PageCount>
        Pagina {currentIndex} de {lastIndex}
      </PageCount>
    </>
  );
};

export default CoursesTable;
