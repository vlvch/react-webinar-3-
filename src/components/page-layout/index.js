import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function PageLayout(props) {
  const {
    head = <></>,
    children = <></>,
    footer = <></>,
  } = props;

  const cn = bem('PageLayout');

  return (
    <div className={cn()}>
      <div className={cn('head')}>{head}</div>
      <div className={cn('center')}>{children}</div>
      <div className={cn('footer')}>{footer}</div>
    </div>
  );
}

PageLayout.propTypes = {
  head: PropTypes.node,
  children: PropTypes.node,
  footer: PropTypes.node,
};

export default memo(PageLayout);
