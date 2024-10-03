import { memo, useCallback } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import SideLayout from '../../components/side-layout';
import useStore from '../../hooks/use-store';
import useSelector from '../../hooks/use-selector';
import useTranslate from '../../hooks/use-translate';

/**
 * Контейнер авторизации
 */
function LoginTool() {
  const store = useStore();
  const navigate = useNavigate();
  const location = useLocation();

  const select = useSelector(state => ({
    logged: state.login.logged,
    username: state.login.user.profile?.name
  }));

  const callbacks = {
    onLogIn: useCallback(() => { if (location.pathname !== '/login') navigate('login') }),
    onLogOut: useCallback(() => store.actions.login.logOut(), [store]),
  };

  const { t } = useTranslate();

  return (
    <SideLayout padding="small" side={'end'} border={'bottom'} margin={'medium'} >
      <Link to={'/profile'}>
        {select.username}
      </Link>
      <button onClick={() => select.logged ? callbacks.onLogOut() : callbacks.onLogIn()}>
        {select.logged ?
          t('login.exit')
          :
          t('login.entry')}
      </button>
    </SideLayout >
  );
}

export default memo(LoginTool);
