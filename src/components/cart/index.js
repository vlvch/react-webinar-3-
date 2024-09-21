import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import List from '../list';
import Modal from '../modal';
import CartItem from '../cart-item';
import { formatNumber } from '../../utils';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function Cart(props) {
  const cn = bem('Cart');

  const {
    onClick = () => { },
    toggleModal = () => { },
  } = props;

  const callbacks = {
    renderItem: useCallback(
      (item, onClick) => {
        return <CartItem item={item} onClick={onClick} />
      }
    )
  }

  return (
    <Modal toggleModal={toggleModal} title={"Корзина"}>
      <div className={cn()}>
        <div className={cn('space')}></div>
        <div className={cn('list')}>
          <List list={props.list} onClick={onClick} renderItem={callbacks.renderItem} />
        </div>
        <div className={cn('footer')}>
          Итого <span>{formatNumber(props.sum)} ₽</span>
        </div>
      </div>
    </Modal >
  );
}

Cart.propTypes = {
  list: PropTypes.array,
  title: PropTypes.string,
  onClick: PropTypes.func,
  toggleModal: PropTypes.func,
};

export default React.memo(Cart);
