import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { numberFormat } from '../../utils';
import './style.css';

function Item(props) {
  const {
    item = {},
    words = {},
    onAdd = () => { },
  } = props;

  const cn = bem('Item');

  const callbacks = {
    onAdd: e => {
      e.stopPropagation();
      onAdd(props.item._id);
    },
  };

  return (
    <div className={cn()}>
      <div className={cn('title')}>{item.title}</div>
      <div className={cn('actions')}>
        <div className={cn('price')}>{numberFormat(item.price)} ₽</div>
        <button onClick={callbacks.onAdd}>{words.add}</button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    price: PropTypes.number,
  }).isRequired,
  onAdd: PropTypes.func,
  words: PropTypes.object,
};

export default memo(Item);
