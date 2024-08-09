import { Thead, Tr } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import { BackofficeUserInfo } from '../../../../../models/UserModels';
import { Table, Tbody, PageCount, Th, Td } from '../../../../_layout/AdminLayout.styles';

import * as S from './styles';
import { useWhitelabel } from '../../../../../hooks/useWhitelabel';
import { SUBDOMAIN_ENUM } from '../../../../../constants/subddomainEnum';

interface IUsersTable {
  data: BackofficeUserInfo[];
  currentIndex: number;
  lastIndex: number;
}

const UsersTable: React.FC<IUsersTable> = ({ data, currentIndex, lastIndex }) => {
  const { subdomain } = useWhitelabel();

  const isChurch = subdomain() === SUBDOMAIN_ENUM.MARTINBUCER;

  return (
    <>
      <Table breakpoint={1000}>
        <Thead>
          <Tr>
            <Th>{'    '}</Th>
            <Th>Nome</Th>
            <Th>E-mail</Th>
            <Th>Telefone</Th>
            <Th>Endereço</Th>
            <Th>E-mail Verificado?</Th>
            {isChurch && (
              <>
                <Th>Já Assinou Contrato?</Th>
                <Th>Já Comprou e Pagou?</Th>
                <Th>Nome da Igreja</Th>
              </>
            )}
          </Tr>
        </Thead>
        <Tbody>
          {data.map((item, index) => (
            <Tr key={item.user.userid}>
              <Td>{index + 1}</Td>
              <Td>{item.user.fullname}</Td>
              <Td>{item.user.email}</Td>
              <Td>{item.user.cellphone ?? ''}</Td>
              <Td>{item.address ? item.address.city + '-' + item.address.state : ''}</Td>
              <Td>{item.user.status === 'waitingVerification' ? 'NÃO' : 'SIM'}</Td>
              {isChurch && (
                <>
                  <Td>{item.user.clicksign_is_signed ? 'SIM' : 'NÃO'}</Td>
                  <Td>{item.user.purchases > 0 ? 'SIM' : 'NÃO'}</Td>
                  <Td>{item.user.schoolpartner}</Td>
                </>
              )}
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

export default UsersTable;
