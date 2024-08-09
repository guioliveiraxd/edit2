import { useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import HeaderV2 from '../../components/Mols/HeaderV2';
import WhatsappFloating from '../../components/Mols/WhatsappFloating';
import { useAuth } from '../../hooks/auth';
import { getHeaderTabs, getUserRole } from '../../utils/accessRoleHelper';
import { useInitialRoute } from '../../hooks/InitialRouteContext';

interface IAdminLayout {
  children: JSX.Element;
}

export const UsersLayout: React.FC<IAdminLayout> = ({ children }) => {
  const [tab, setTab] = useState('courses');
  const { user } = useAuth();
  const { isBindemy } = useInitialRoute();

  const role = useMemo(() => {
    let getAllTabs = getUserRole(user?.profileid, user?.levelid, user?.schoolid);
    return getAllTabs;
  }, [user]);

  const HeaderTabs = useMemo(() => getHeaderTabs(role, false), [role]);
  const HeaderRules = ['login', 'signup', 'password', 'admin', 'verify', 'bindemy'];
  const { pathname } = useLocation();

  const coursesRulesHome = ['courses'];
  const isHomeCourses =
    coursesRulesHome.some(pathName => pathname.includes(pathName)) || pathname === '/';

  return (
    <>
      {user && !pathname.includes('unity') && !pathname.includes('verify') ? (
        <HeaderV2
          isHomeCourses={isHomeCourses}
          actualTab={tab}
          tabs={HeaderTabs}
          changeTab={setTab}
        />
      ) : !HeaderRules.some(pathName => pathname.includes(pathName)) && !isBindemy ? (
        <HeaderV2 isHomeCourses={isHomeCourses} />
      ) : (
        <></>
      )}
      {children}
      <WhatsappFloating />
    </>
  );
};
