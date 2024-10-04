import { memo, useCallback, useLayoutEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import debounce from 'lodash.debounce';

import './style.css';

function Input(props) {
  const {
    propsName = '',
    propsValue = '',
    propsTheme = '',
    propsType = '',
    propsPlaceholder = '',
    propsDelay = 600,
    propsOnChange = () => { },
  } = props;

  // Внутренний стейт для быстрого отображения ввода
  const [value, setValue] = useState(propsValue);

  const onChangeDebounce = useCallback(
    debounce(value => propsOnChange(value, propsName), propsDelay),
    [propsOnChange, propsName],
  );

  // Обработчик изменений в поле
  const onChange = event => {
    setValue(event.target.value);
    onChangeDebounce(event.target.value);
  };

  // Обновление стейта, если передан новый value
  useLayoutEffect(() => setValue(propsValue), [propsValue]);

  const cn = bem('Input');
  return (
    <input
      className={cn({ theme: propsTheme })}
      value={value}
      type={propsType}
      placeholder={propsPlaceholder}
      onChange={onChange}
    />
  );
}

Input.propTypes = {
  value: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  theme: PropTypes.string,
};

export default memo(Input);
