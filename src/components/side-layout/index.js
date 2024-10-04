import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function SideLayout(props) {
  const {
    side = '',
    padding = '',
    border = '',
    children = <></>,
    margin = 'small'
  } = props;

  const cn = bem('SideLayout');
  return (
    <div className={cn({ side, padding, border })}>
      {React.Children.map(children, child => (
        <div key={child.key} className={cn('item', { margin })}>
          {child}
        </div>
      ))}
    </div>
  );
}

SideLayout.propTypes = {
  children: PropTypes.node,
  side: PropTypes.oneOf(['start', 'end', 'between']),
  padding: PropTypes.oneOf(['small', 'medium']),
  border: PropTypes.oneOf(['bottom']),
  marginItem: PropTypes.oneOf(['small', 'medium'])
};

export default memo(SideLayout);
