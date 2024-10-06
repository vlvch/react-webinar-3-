import { memo, useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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

/**
 * Страница авторизации
 */
function Login() {
  const store = useStore();
  const [loginData, setLoginData] = useState({ login: '', password: '' });

  useInit(
    () => {
      store.actions.session.initSession();
      store.actions.session.resetErrors();
    },
    [],
    true,
  );

  const select = useSelector(state => ({
    waiting: state.session.waiting,
    error: state.session.error,
    errorMessages: state.session.errorMessages,
    userId: state.session.userId
  }));

  const callbacks = {
    // Изменение введенных данных
    onChange: useCallback((value, target) => {
      setLoginData({ ...loginData, [target]: value })
    }),
    // Авторизация
    onLogIn: useCallback(() => {
      store.actions.session.logIn(loginData)
    }, [loginData]),
  }

  const { t } = useTranslate();

  return (
    <AccessCheck redirect={-1} needAuth={false}>
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
