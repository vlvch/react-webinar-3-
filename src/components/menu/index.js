import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function Menu(props) {
  const {
    children = <></>,
  } = props;

  const cn = bem('Menu');

  return (
    <div className={cn()}>
      {children}
    </div>
  );
}

Menu.propTypes = {
  children: PropTypes.node,
};

export default memo(Menu);
