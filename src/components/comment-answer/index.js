import { memo, useState } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function CommentAnswer({ t, onClick, onCancel, _id }) {
  const [text, setText] = useState('');

  const cn = bem("CommentAnswer");

  return (
    <div className={cn()} >
      <div className={cn('title')}>{t('comment.answer.title')}</div>
      <div className={cn('input')}>
        <textarea value={text} onChange={(e) => setText(e.target.value)}></textarea>
      </div>
      <div className={cn('сontrols')}>
        <button onClick={() => onClick(_id, text)}>{t('comment.answer.send')}</button>
        <button onClick={() => onCancel()}>{t('comment.answer.cancel')}</button>
      </div>
    </div>
  );
}

CommentAnswer.propTypes = {
  t: PropTypes.func
};

export default memo(CommentAnswer);
