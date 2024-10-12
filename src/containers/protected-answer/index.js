import { memo, useRef, useEffect } from 'react';
import React from 'react';
import PropTypes from 'prop-types';
import useSelector from '../../hooks/use-selector';

function ProtectedAnswer(props) {
  const { children = <></>, scroll = false } = props;

  const ref = useRef(null);

  useEffect(() => {
    if (ref.current && scroll) {
      ref.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'center'
      });
    }
  }, [children])

  const select = useSelector(state => ({
    exists: state.session.exists,
  }));

  const childrenArray = React.Children.toArray(children);

  return (
    <div className={'ProtectedAnswer'} ref={ref}>
      {select.exists ?
        childrenArray[0]
        :
        childrenArray[1]}
    </div>
  )
}

ProtectedAnswer.propTypes = {
  children: PropTypes.node,
  scroll: PropTypes.bool
};

export default memo(ProtectedAnswer);
