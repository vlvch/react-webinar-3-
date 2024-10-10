import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function List({ list, renderItem = item => { }, gap, border }) {
  const cn = bem('List')
  return (
    <div className={cn({ gap })}>
      {list.map(item => (
        <div key={item._id} className={cn('item', { border })}>
          {renderItem(item)}
        </div>
      ))}
    </div>
  );
}

List.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    }),
  ).isRequired,
  renderItem: PropTypes.func,
  gap: PropTypes.oneOf(['medium']),
  nodash: PropTypes.oneOf(['true']),
};

export default memo(List);
