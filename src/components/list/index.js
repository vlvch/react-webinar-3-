import React from 'react';
import PropTypes from 'prop-types';
import Item from '../item';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function List(props) {
  const cn = bem('List');

  const {
    onClick = () => { },
  } = props;

  return (
    <div className={cn()}>
      {props.list.map(item => (
        <div key={item.code} className={cn('item')}>
          <Item item={item} type={props.type} onClick={onClick} />
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
  type: PropTypes.string,
  onClick: PropTypes.func,
};

export default React.memo(List);
