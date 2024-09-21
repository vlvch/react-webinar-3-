import React from 'react';
import PropTypes from 'prop-types';
import { formatNumber, plural } from '../../utils';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function Controls(props) {
  const cn = bem('Controls');

  const {
    toggleModal = () => { },
  } = props;

  return (
    <div className={cn()}>
      <div>В корзине:</div>
      <div className={cn('count')}>
        {props.sum ?
          `${props.count} ${plural(props.count, {
            one: 'товар',
            few: 'товара',
            many: 'товаров',
          })}
          / ${formatNumber(props.sum)} ₽`
          :
          'пусто'
        }
      </div>
      <button onClick={() => toggleModal()}>Перейти</button>
    </div>
  );
}

Controls.propTypes = {
  toggleModal: PropTypes.func,
  sum: PropTypes.number,
  count: PropTypes.number,
};

export default React.memo(Controls);
