import { Thead, Tr } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import { AdminCourse } from "../../../../../models/CourseModels";
import {
  Table,
  Tbody,
  PageCount,
  Th,
  Td,
} from "../../../../_layout/AdminLayout.styles";

interface ICoursesTable {
  data: AdminCourse[];
  currentIndex: number;
  lastIndex: number;
  onSelectItem: (args: { cartid: string; transactionid: string }) => void;
}

const CoursesTable: React.FC<ICoursesTable> = ({
  data,
  currentIndex,
  lastIndex,
  onSelectItem,
}) => {
  return (
    <>
      <Table breakpoint={1000}>
        <Thead>
          <Tr>
            <Th> </Th>
            <Th>Titulo</Th>
            <Th>Preço</Th>
            <Th>Ranking</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.map((item) => (
            <Tr key={item.courseid}>
              <Td>
                <img src={item.thumburl} width={120} alt="course-thumb" />
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
