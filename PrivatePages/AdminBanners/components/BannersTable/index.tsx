import { Thead, Tr } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import { BannersAdmin } from "../../../../../models/BannersModels";

import { Table, Tbody, Th, Td } from "../../../../_layout/AdminLayout.styles";

interface BannersTable {
  data: BannersAdmin[];
  onSelectItem: (args: { cartid: string; transactionid: string }) => void;
}

const BannersTable: React.FC<BannersTable> = ({ data, onSelectItem }) => {
  return (
    <>
      <Table breakpoint={1000}>
        <Thead>
          <Tr>
            <Th>Link</Th>
            <Th style={{ textAlign: "start", width: "50%" }}>Banner</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.map((item) => (
            <Tr key={item?.bannerid}>
              <Td>
                {item?.linkurl !== " " ? (
                  <a href={item?.linkurl} target="_blank">
                    Link vinculado
                  </a>
                ) : (
                  <p>Sem link cadastrado</p>
                )}
              </Td>
              <Td style={{ textAlign: "start", width: "50%" }}>
                <img src={item?.url} width={320} alt="course-thumb" />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </>
  );
};

export default BannersTable;
