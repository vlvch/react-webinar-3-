import React from 'react';
import PropTypes from 'prop-types';
import Head from '../head';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function Modal(props) {
  const cn = bem('Modal');

  const {
    toggleModal = () => { },
  } = props;

  return (
    <div className={cn()}>
      <div className={cn('content')}>
        <Head title={props.title} type={'modal'}>
          <button onClick={toggleModal}>Закрыть</button>
        </Head>
        {props.children}
      </div>
    </div>
  );
}

Modal.propTypes = {
  title: PropTypes.string,
  toggleModal: PropTypes.func,
  children: PropTypes.node
};

export default React.memo(Modal);
