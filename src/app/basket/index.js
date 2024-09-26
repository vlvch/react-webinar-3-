import { memo, useCallback } from 'react';
import ItemBasket from '../../components/item-basket';
import List from '../../components/list';
import ModalLayout from '../../components/modal-layout';
import BasketTotal from '../../components/basket-total';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';
import { useNavigate } from 'react-router-dom';

function Basket() {
  const store = useStore();
  const navigate = useNavigate();

  const select = useSelector(state => ({
    list: state.basket.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
    locale: state.locale.currentLocale,
    words: state.locale.words,
  }));

  const words = select.words[select.locale];

  const callbacks = {
    // Удаление из корзины
    removeFromBasket: useCallback(_id => store.actions.basket.removeFromBasket(_id), [store]),
    // Закрытие любой модалки
    closeModal: useCallback(() => store.actions.modals.close(), [store]),
    // Загрузка текущего товара и переход на страницу
    openArticle: useCallback(_id => {
      store.actions.modals.close()
      store.actions.article.loadArticle(_id);
      navigate(`/article/${_id}`);
    }, [store])
  };

  const renders = {
    itemBasket: useCallback(
      item => {
        return <ItemBasket item={item} onRemove={callbacks.removeFromBasket} words={words} />;
      },
      [callbacks.removeFromBasket, words],
    ),
  };

  return (
    <ModalLayout words={words} onClose={callbacks.closeModal}>
      <List list={select.list} renderItem={renders.itemBasket} openArticle={callbacks.openArticle} />
      <BasketTotal sum={select.sum} words={words} />
    </ModalLayout>
  );
}

export default memo(Basket);
