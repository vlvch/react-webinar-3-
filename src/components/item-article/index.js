import { memo } from 'react';
import propTypes from 'prop-types';
import { numberFormat } from '../../utils';
import { cn as bem } from '@bem-react/classname';
import './style.css';


function ItemArticle(props) {
  const {
    words = {},
    description = '',
    country = '',
    countryCode = '',
    category = '',
    edition = '',
    price = '',
    onAdd = () => { },
  } = props;

  const cn = bem('ItemArticle');

  return (
    <div className={cn()}>
      <div className={cn('description')}>{description}</div>
      <div className={cn('country')}>{words.country}: <b>{country} ({countryCode})</b></div>
      <div className={cn('category')}>{words.category}: <b>{category}</b></div>
      <div className={cn('edition')}>{words.edition}: <b>{edition}</b></div>
      <div className={cn('price')}><b>{words.price}: {numberFormat(price)} ₽</b></div>
      <div className={cn('button')}>
        <button onClick={() => onAdd(props.id)}>{words.add}</button>
      </div>
    </div>
  );
}

ItemArticle.propTypes = {
  words: propTypes.object,
  description: propTypes.string,
  country: propTypes.string,
  countryCode: propTypes.string,
  category: propTypes.string,
  edition: propTypes.number,
  price: propTypes.number,
  onAdd: propTypes.func,
};

export default memo(ItemArticle);
