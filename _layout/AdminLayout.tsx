import { useLocation } from 'react-router-dom';

import Sidebar from '../../components/Mols/AdminSidebar';

import * as S from './AdminLayout.styles';

interface IAdminLayout {
  children: JSX.Element;
}

export const AdminLayout: React.FC<IAdminLayout> = ({ children }) => {
  const location = useLocation();

  const title: { [name: string]: string } = {
    '/admin': 'Minhas Vendas',
    '/admin/users': 'Usuários',
    '/admin/courses': 'Meus Cursos',
    '/admin/courses-infos': 'Selecione um Curso',
    '/admin/course-info': 'Informaçöes do Curso',
    '/admin/banners': 'Meus Banners',
    '/admin/sections': 'Minhas Sessões',
    '/admin/add-course-video': 'Meus Videos',
  };

  return (
    <Sidebar>
      <S.Container>
        <S.TitleContainer>
          <S.Title>{title[location.pathname]}</S.Title>
        </S.TitleContainer>
        {children}
      </S.Container>
    </Sidebar>
  );
};
