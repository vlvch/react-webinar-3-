import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';
import Input from '../input';

function LoginCard(props) {
  const {
    errorMessages = [],
    error = false,
    t = () => { },
    onLogIn = () => { },
    onChange = () => { },
  } = props;

  const cn = bem('LoginCard');

  return (
    <div className={cn()}>
      <div className={cn('title')}>{t('login.entry')}</div>
      <div className={cn('input')}>
        <div>{t('login.login')}</div>
        <Input
          propsValue={''}
          propsName={'login'}
          propsOnChange={onChange}
          propsDelay={1000} />
      </div >
      <div className={cn('input')}>
        <div>{t('login.password')}</div>
        <Input
          propsValue={''}
          propsType={'password'}
          propsName={'password'}
          propsOnChange={onChange}
          propsDelay={1000} />
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
