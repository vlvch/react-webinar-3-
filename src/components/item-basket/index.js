import { memo, useCallback } from 'react';
import propTypes from 'prop-types';
import { numberFormat } from '../../utils';
import { cn as bem } from '@bem-react/classname';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './style.css';

function ItemBasket(props) {
  const {
    onRemove = () => { },
    labelCurr = '₽',
    labelUnit = 'шт',
    labelDelete = 'Удалить',
    item = {},
    link = '',
    onLink = () => { },
  } = props;

  const cn = bem('ItemBasket');

  const callbacks = {
    onRemove: e => onRemove(item._id),
  };

  return (
    <div className={cn()}>
      {/*<div className={cn('code')}>{item._id}</div>*/}
      <div className={cn('title')}>
        {link ? (
          <Link to={link} onClick={onLink}>
            {item.title}
          </Link>
        ) : (
          item.title
        )}
      </div>
      <div className={cn('right')}>
        <div className={cn('cell')}>
          {numberFormat(item.price)} {labelCurr}
        </div>
        <div className={cn('cell')}>
          {numberFormat(item.amount || 0)} {labelUnit}
        </div>
        <div className={cn('cell')}>
          <button onClick={callbacks.onRemove}>{labelDelete}</button>
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
  link: PropTypes.string,
  onLink: PropTypes.func,
  onRemove: PropTypes.func,
  labelCurr: PropTypes.string,
  labelDelete: PropTypes.string,
  labelUnit: PropTypes.string,
};

export default memo(ItemBasket);
