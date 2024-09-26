import { memo } from 'react';
import propTypes from 'prop-types';
import { numberFormat } from '../../utils';
import { cn as bem } from '@bem-react/classname';
import PropTypes from 'prop-types';
import './style.css';

function ItemBasket(props) {
  const {
    words = {},
    item = {},
    onRemove = () => { },
  } = props;

  const cn = bem('ItemBasket');

  const callbacks = {
    onRemove: e => {
      e.stopPropagation();
      onRemove(props.item._id);
    },
  };

  return (
    <div className={cn()}>
      <div className={cn('title')}>{item.title}</div>
      <div className={cn('right')}>
        <div className={cn('cell')}>{numberFormat(item.price)} ₽</div>
        <div className={cn('cell')}>{numberFormat(item.amount || 0)} {words.pcs}</div>
        <div className={cn('cell')}>
          <button onClick={callbacks.onRemove}>{words.remove}</button>
        </div>
      </div>
    </div>
  );
}

ItemBasket.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    price: PropTypes.number,
    amount: PropTypes.number,
  }).isRequired,
  onRemove: propTypes.func,
  words: propTypes.object,
};

export default memo(ItemBasket);
