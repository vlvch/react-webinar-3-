import { memo, useState } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function ArticleAnswer(props) {
  const { t = text => text, onClick = () => { } } = props;

  const [text, setText] = useState('');

  const cn = bem("ArticleAnswer");

  return (
    <div className={cn()}>
      <div className={cn('title')}>{t('article.answer.title')}</div>
      <div className={cn('input')}>
        <textarea value={text} onChange={(e) => setText(e.target.value)}></textarea>
      </div>
      <div className={cn('сontrols')}>
        <button onClick={() => onClick(text)}>{t('article.answer.send')}</button>
      </div>
    </div>
  );
}

ArticleAnswer.propTypes = {
  t: PropTypes.func,
  onClick: PropTypes.func
};

export default memo(ArticleAnswer);
