import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';
import { Link } from 'react-router-dom';

function ArticleStub({ t }) {
  const cn = bem("ArticleStub");
  return (
    <div className={cn()}>
      <Link to={'/login'}>{t('article.stub.link')}</Link>
      {t('article.stub.text')}
    </div>
  );
}

ArticleStub.propTypes = {
  t: PropTypes.func
};

export default memo(ArticleStub);
