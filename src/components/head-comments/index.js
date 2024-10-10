import { memo } from 'react';
import PropTypes from 'prop-types';
import './style.css';

function HeadComments(props) {
  const { t = text => text, count = 0 } = props

  return (
    <div className="HeadComments">
      {`${t('comments.title')} (${count})`}
    </div>
  );
}

HeadComments.propTypes = {
  t: PropTypes.func,
  count: PropTypes.number,
};

export default memo(HeadComments);
