import { memo } from 'react';
import PropTypes from 'prop-types';
import './style.css';

function Controls(props) {
  const {
    onAdd = () => { },
  } = props;

  return (
    <div className="Controls">
      <button onClick={() => onAdd()}>Добавить</button>
    </div>
  );
}

Controls.propTypes = {
  onAdd: PropTypes.func,
};

export default memo(Controls);
