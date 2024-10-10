import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function ArticleStub(props) {
  const { t = text => text, onSignIn = () => { } } = props;

  const cn = bem("ArticleStub");

  return (
    <div className={cn()}>
      <span onClick={() => onSignIn()}>{t('article.stub.link')}</span>
      {t('article.stub.text')}
    </div>
  );
}

ArticleStub.propTypes = {
  t: PropTypes.func,
  onSignIn: PropTypes.func
};

export default memo(ArticleStub);
