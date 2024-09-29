import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { numberFormat, plural } from '../../utils';
import './style.css';

function BasketTool(props) {
  const {
    sum = 0,
    amount = 0,
    onOpen = () => { },
    words = {},
  } = props;

  const cn = bem('BasketTool');

  return (
    <div className={cn()}>
      <span className={cn('label')}>{words.incart}:</span>
      <span className={cn('total')}>
        {amount
          ? `${amount} ${plural(amount, words.items)} / ${numberFormat(sum)} ₽`
          : words.empty}
      </span>
      <button onClick={onOpen}>{words.go}</button>
    </div>
  );
}

BasketTool.propTypes = {
  onOpen: PropTypes.func.isRequired,
  sum: PropTypes.number,
  amount: PropTypes.number,
  words: PropTypes.object,
};

export default memo(BasketTool);
