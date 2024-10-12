import { memo, useState } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function CommentAnswer(props) {
  const { t = text => text,
    onClick = () => { },
    onCancel = () => { },
    _id = '',
    level = 0,
  } = props;

  const [text, setText] = useState('');

  const cn = bem("CommentAnswer");

  return (
    <div className={cn()} style={{ paddingLeft: ((level > 15 ? 15 : level) * 30) + 'px' }}>
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
  t: PropTypes.func,
  onClick: PropTypes.func,
  onCancel: PropTypes.func,
  _id: PropTypes.string,
  level: PropTypes.number
};

export default memo(CommentAnswer);
