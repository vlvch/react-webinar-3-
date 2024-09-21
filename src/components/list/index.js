import React from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function List(props) {
  const cn = bem('List');

  const {
    onClick = () => { },
    renderItem = () => { },
  } = props;

  return (
    <div className={cn()}>
      {props.list.map(item => (
        <div key={item.code} className={cn('item')}>
          {renderItem(item, onClick)}
        </div>
      ))}
    </div>
  );
}

List.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number,
    }),
  ).isRequired,
  onClick: PropTypes.func,
  renderItem: PropTypes.func
};

export default React.memo(List);
