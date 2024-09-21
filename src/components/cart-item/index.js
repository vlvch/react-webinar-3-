import React from 'react';
import PropTypes from 'prop-types';
import { formatNumber } from '../../utils';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function CartItem(props) {
  const cn = bem('CartItem');

  const {
    onClick = () => { },
  } = props;

  const callbacks = {
    onClick: () => {
      onClick(props.item.code);
    },
  };

  return (
    <div className={cn()}>
      <div className={cn('code')}>{props.item.code}</div>
      <div className={cn('title')}>{props.item.title}</div>
      <div className={cn('price')}>{formatNumber(props.item.price)} ₽</div>
      <div className={cn('count')}>{props.item.count} шт</div>
      <div className={cn('actions')}>
        <button onClick={callbacks.onClick}>Удалить</button>
      </div>
    </div>
  );
}

CartItem.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    count: PropTypes.number,
    price: PropTypes.number,
  }).isRequired,
  onClick: PropTypes.func,
};

export default React.memo(CartItem);
