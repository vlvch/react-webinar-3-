import { memo } from 'react';
import { cn as bem } from '@bem-react/classname';
import PropTypes from 'prop-types';
import './style.css';

function ItemComment(props) {
  const { onSelect = () => { },
    labelName = 'User',
    labelDate = '',
    labelText = '',
    labelAnswer = 'Ответить',
    level = 0,
    children = <></>
  } = props;

  const cn = bem('ItemComment');

  return (
    <div className={cn()} style={{ paddingLeft: (level * 30) + 'px' }}>
      <div className={cn('cell')}>
        <div className={cn('name')}>{labelName}</div>
        <div className={cn('date')}>{labelDate}</div>
      </div>
      <div className={cn('cell')}>
        <div className={cn('text')}>{labelText}</div>
      </div>
      <div className={cn('cell')}>
        <div className={cn('answer')} onClick={() => onSelect()}>{labelAnswer}</div>
      </div>
      {children}
    </div>
  );
}

ItemComment.propTypes = {
  onRemove: PropTypes.func,
  _id: PropTypes.string,
  labelText: PropTypes.string,
  labelDate: PropTypes.string,
  labelName: PropTypes.string,
  labelAnswer: PropTypes.string,
};

export default memo(ItemComment);
