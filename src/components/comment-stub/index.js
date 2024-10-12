import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function CommentStub(props) {
  const { t = text => text,
    onCancel = () => { },
    onSignIn = () => { },
    level = 0 } = props;

  const cn = bem("CommentStub");

  return (
    <div className={cn()} style={{ paddingLeft: ((level > 15 ? 15 : level) * 30) + 'px' }}>
      <span className={cn('login')} onClick={() => onSignIn()}>{t('comment.stub.link')}</span>
      {t('comment.stub.text')}
      <span className={cn('cancel')} onClick={() => onCancel()}>{t('comment.stub.cancel')}</span>
    </div>
  );
}

CommentStub.propTypes = {
  t: PropTypes.func,
  onCancelt: PropTypes.func,
  onSignIn: PropTypes.func,
  level: PropTypes.number
};

export default memo(CommentStub);
