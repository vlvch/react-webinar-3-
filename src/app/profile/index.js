import { memo } from 'react';
import useStore from '../../hooks/use-store';
import useTranslate from '../../hooks/use-translate';
import useInit from '../../hooks/use-init';
import Navigation from '../../containers/navigation';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import LocaleSelect from '../../containers/locale-select';
import LoginTool from '../../containers/login-tool';
import AccessCheck from '../../containers/access-check';
import useSelector from '../../hooks/use-selector';
import ProfileCard from '../../components/profile-card';
import Spinner from '../../components/spinner';

/**
 * Главная страница - первичная загрузка каталога
 */
function Profile() {
  const store = useStore();

  useInit(
    () => {
      store.actions.login.initLogin();
    },
    [],
    true,
  );

  const select = useSelector(state => ({
    waiting: state.login.waiting,
    logged: state.login.logged,
    username: state.login.user.profile?.name,
    email: state.login.user.email,
    phone: state.login.user.profile?.phone,
  }));

  const { t } = useTranslate();

  return (
    <AccessCheck redirect={'/login'} access={!select.logged}>
      <PageLayout>
        <LoginTool />
        <Head title={t('title')}>
          <LocaleSelect />
        </Head>
        <Navigation />
        <Spinner active={select.waiting}>
          <ProfileCard t={t} username={select.username} email={select.email} phone={select.phone} />
        </Spinner>
      </PageLayout>
    </AccessCheck>
  );
}

export default memo(Profile);
