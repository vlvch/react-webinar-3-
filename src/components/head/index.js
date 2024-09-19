import React from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function Head(props) {
  const cn = bem('Head');

  return (
    <div className={cn() + (props.type === 'modal' ? ' Head_sticked' : '')}>
      <h1>{props.title}</h1>
      <div className={cn('items')}>{props.children}</div>
    </div>
  );
}

Head.propTypes = {
  title: PropTypes.node,
  children: PropTypes.node,
  type: PropTypes.string,
};

export default React.memo(Head);
