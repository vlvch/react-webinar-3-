import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';
import Input from '../input';

function LoginCard({ onLogIn, t, onChange, error, errorMessages = [] }) {
  const cn = bem('LoginCard');

  return (
    <div className={cn()}>
      <div className={cn('title')}>{t('login.entry')}</div>
      <div className={cn('input')}>
        <div>{t('login.login')}</div>
        <Input
          value={''}
          name={'login'}
          onChange={onChange}
          delay={1000} />
      </div >
      <div className={cn('input')}>
        <div>{t('login.password')}</div>
        <Input
          value={''}
          type={'password'}
          name={'password'}
          onChange={onChange}
          delay={1000} />
      </div>
      {
        error
        &&
        errorMessages.map((item) => <div key={item} className={cn('error')}>{item}</div>)
      }
      <div>
        <button className={cn('item')} onClick={() => onLogIn()}>{t('login.enter')}</button>
      </div>
    </div >
  );
}

LoginCard.propTypes = {
  error: PropTypes.bool,
  errorMessages: PropTypes.array,
  onChange: PropTypes.func,
  onLogIn: PropTypes.func,
  t: PropTypes.func,
};

export default memo(LoginCard);
