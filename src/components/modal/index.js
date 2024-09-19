import React from 'react';
import PropTypes from 'prop-types';
import List from '../list';
import Head from '../head';
import { formatNumber } from '../../utils';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function Modal(props) {
  const cn = bem('Modal');

  const {
    onClick = () => { },
    onOpenCart = () => { },
  } = props;

  return (
    <div className={cn()}>
      <div className={cn('content')}>
        <Head title={props.title} type={'modal'}>
          <button onClick={onOpenCart}>Закрыть</button>
        </Head>
        <div className={cn('space')}></div>
        <div className={cn('list')}>
          <List list={props.list} onClick={onClick} type={'modal'} />
        </div>
        <div className={cn('footer')}>
          Итого <span>{formatNumber(props.sum)} ₽</span>
        </div>
      </div>
    </div>
  );
}

Modal.propTypes = {
  list: PropTypes.array,
  title: PropTypes.string,
  onClick: PropTypes.func,
};

export default React.memo(Modal);
