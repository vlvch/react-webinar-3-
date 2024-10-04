import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function ProfileCard(props) {
  const {
    phone = '',
    email = '',
    username = '',
    t = text => text,
  } = props;

  const cn = bem('ProfileCard');
  return (
    <div className={cn()}>
      <div className={cn('title')}>{t('profile.title')}</div>
      <div className={cn('prop')}>
        <div className={cn('label')}>{t('profile.username')}</div>
        <div className={cn('value')}>{username}</div>
      </div>
      <div className={cn('prop')}>
        <div className={cn('label')}>{t('profile.phone')}</div>
        <div className={cn('value')}> {phone}</div>
      </div>
      <div className={cn('prop')}>
        <div className={cn('label')}>{t('profile.email')}</div>
        <div className={cn('value')}> {email}</div>
      </div>
    </div>
  )
}

ProfileCard.propTypes = {
  username: PropTypes.string,
  email: PropTypes.string,
  phone: PropTypes.string,
  t: PropTypes.func,
};

export default memo(ProfileCard);
