import { memo } from 'react';
import { Navigate } from 'react-router-dom';

/**
 * Проверка доступа
 */
function AccessCheck({ redirect, access, children }) {
  return (
    <>
      {access && <Navigate to={redirect} />}
      <div className='AccessCheck'>
        {children}
      </div>
    </>
  );
}

export default memo(AccessCheck);