import { memo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useSelector from '../../hooks/use-selector';

/**
 * Проверка доступа
 */
function AccessCheck({ redirect, needAuth, children }) {
  const navigate = useNavigate();

  const select = useSelector(state => ({
    logged: state.session.logged,
  }));

  useEffect(() => {
    if (needAuth !== select.logged) {
      navigate(redirect);
    }
  }, [select.logged])

  return (
    <div className='AccessCheck'>
      {children}
    </div>
  );
}

export default memo(AccessCheck);