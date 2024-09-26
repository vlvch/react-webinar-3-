import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { numberFormat } from '../../utils';
import './style.css';

function BasketTotal(props) {
  const {
    sum = 0,
    words = {},
  } = props;

  const cn = bem('BasketTotal');
  return (
    <div className={cn()}>
      <span className={cn('cell')}>{words.total}</span>
      <span className={cn('cell')}> {numberFormat(sum)} ₽</span>
      <span className={cn('cell')}></span>
    </div>
  );
}

BasketTotal.propTypes = {
  sum: PropTypes.number,
  words: PropTypes.object
};

export default memo(BasketTotal);
