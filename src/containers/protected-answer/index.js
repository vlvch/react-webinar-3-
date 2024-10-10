import { memo } from 'react';
import React from 'react';
import PropTypes from 'prop-types';
import useSelector from '../../hooks/use-selector';

function ProtectedAnswer({ children }) {
  const select = useSelector(state => ({
    exists: state.session.exists,
  }));

  const childrenArray = React.Children.toArray(children);

  return (select.exists ?
    childrenArray[0]
    :
    childrenArray[1]
  )
}

ProtectedAnswer.propTypes = {
  children: PropTypes.node,
};

export default memo(ProtectedAnswer);
