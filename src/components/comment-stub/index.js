import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';
import { Link } from 'react-router-dom';

function CommentStub({ t, onCancel }) {
  const cn = bem("CommentStub");
  return (
    <div className={cn()}>
      <Link className={cn('login')} to={'/login'}>{t('comment.stub.link')}</Link>
      {t('comment.stub.text')}
      <Link className={cn('cancel')} onClick={() => onCancel()}>{t('comment.stub.cancel')}</Link>
    </div>
  );
}

CommentStub.propTypes = {
  t: PropTypes.func
};

export default memo(CommentStub);
