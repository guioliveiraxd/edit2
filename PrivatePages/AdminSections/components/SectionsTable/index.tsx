import { Thead, Tr } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import { SectionsModels } from "../../../../../models/SectionsModels";

import { Table, Tbody, Th, Td } from "../../../../_layout/AdminLayout.styles";

interface SectionTable {
  data: SectionsModels[];
  onSelectItem: (args: { cartid: string; transactionid: string }) => void;
}

const SectionsTable: React.FC<SectionTable> = ({ data, onSelectItem }) => {
  return (
    <>
      <Table breakpoint={1000}>
        <Thead>
          <Tr>
            <Th>Titulo da Seção</Th>
            <Th>Posição na Home</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.map((item) => (
            <Tr key={item?.schoolid_sectionid}>
              <Td>{item?.title}</Td>
              <Td>{item?.position}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </>
  );
};

export default SectionsTable;
