import { memo } from 'react';
import './style.css';

function Spinner() {
  return (
    <div className="Spinner">
      <div className='Spinner-circle'></div>
    </div>
  );
}

export default memo(Spinner);
