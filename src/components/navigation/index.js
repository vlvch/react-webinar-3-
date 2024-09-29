import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { useNavigate } from 'react-router-dom';
import './style.css';

function Navigation(props) {
  const {
    words = {}
  } = props;

  const cn = bem('Navigation');

  const navigate = useNavigate();

  return (
    <div className={cn()}>
      <div className={cn('item')}>
        <span onClick={() => navigate('/')}>{words.main}</span>
      </div>
    </div>
  );
}

Navigation.propTypes = {
  words: PropTypes.object,
};

export default memo(Navigation);
