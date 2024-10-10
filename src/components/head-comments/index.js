import { memo } from 'react';
import PropTypes from 'prop-types';
import './style.css';

function HeadComments({ t, count }) {
  return (
    <div className="HeadComments">
      {`${t('comments.title')} (${count})`}
    </div>
  );
}

HeadComments.propTypes = {
  title: PropTypes.node,
  children: PropTypes.node,
};

export default memo(HeadComments);
