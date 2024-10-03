import { memo, useCallback, useState } from 'react';
import useStore from '../../hooks/use-store';
import useTranslate from '../../hooks/use-translate';
import useInit from '../../hooks/use-init';
import Navigation from '../../containers/navigation';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import LocaleSelect from '../../containers/locale-select';
import LoginTool from '../../containers/login-tool';
import LoginCard from '../../components/login-card';
import useSelector from '../../hooks/use-selector';
import AccessCheck from '../../containers/access-check';
import Spinner from '../../components/spinner';

function Login() {
  const store = useStore();
  const [loginData, setLoginData] = useState({ login: '', password: '' });

  useInit(
    () => {
      store.actions.login.initLogin();
    },
    [],
    true,
  );

  const select = useSelector(state => ({
    logged: state.login.logged,
    waiting: state.login.waiting,
    error: state.login.error,
    errorMessages: state.login.errorMessages,
  }));

  const callbacks = {
    // Изменение введенных данных
    onChange: useCallback((value, target) => {
      setLoginData({ ...loginData, [target]: value })
    }),
    // Авторизация
    onLogIn: useCallback(() => store.actions.login.logIn(loginData), [loginData]),
  }

  const { t } = useTranslate();

  return (
    <AccessCheck redirect={'/profile'} access={select.logged}>
      <PageLayout>
        <LoginTool />
        <Head title={t('title')}>
          <LocaleSelect />
        </Head>
        <Navigation />
        <Spinner active={select.waiting}>
          <LoginCard
            t={t}
            onChange={callbacks.onChange}
            onLogIn={callbacks.onLogIn}
            error={select.error}
            errorMessages={select.errorMessages}
          />
        </Spinner>
      </PageLayout>
    </AccessCheck >
  );
}

export default memo(Login);
