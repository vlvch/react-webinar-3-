import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function SideLayout({ children, side, padding, width }) {
  const cn = bem('SideLayout');
  return (
    <div className={cn({ side, padding })}>
      {React.Children.map(children, child => (
        <div key={child.key} className={cn('item', { width })}>
          {child}
        </div>
      ))}
    </div>
  );
}

SideLayout.propTypes = {
  children: PropTypes.node,
  side: PropTypes.oneOf(['start', 'end', 'between']),
  padding: PropTypes.oneOf(['small', 'medium', 'large']),
  width: PropTypes.oneOf(['100'])
};

export default memo(SideLayout);
