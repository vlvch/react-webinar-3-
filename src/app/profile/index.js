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
 * Страница профиля
 */
function Profile() {
  const store = useStore();

  const select = useSelector(state => ({
    waiting: false,
    username: state.profile.profile.name,
    email: state.profile.email,
    phone: state.profile.profile.phone,
  }));

  useInit(
    () => {
      store.actions.session.initSession()
      store.actions.profile.loadProfile()
    },
    [],
    true,
  );

  const { t } = useTranslate();

  return (
    <AccessCheck redirect={'/login'} needAuth={true}>
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
