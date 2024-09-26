import { memo } from 'react';
import propTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import PropTypes from 'prop-types';
import './style.css';

function LangControl(props) {
  const {
    locale = 'ru',
    onClick = () => { },
  } = props;

  const cn = bem('LangControl');

  return (
    <div className={cn()} >
      <div onClick={() => onClick('ru')} className={cn('item') + (locale === 'ru' ? ' LangControl-item_selected' : '')}>ru</div>
      <div onClick={() => onClick('en')} className={cn('item') + (locale === 'en' ? ' LangControl-item_selected' : '')}>en</div>
    </div>
  );
}

LangControl.propTypes = {
  locale: propTypes.string,
  onClick: propTypes.func,
};


export default memo(LangControl);
