import React, { useCallback, useState } from 'react';
import List from './components/list';
import Controls from './components/controls';
import Head from './components/head';
import PageLayout from './components/page-layout';
import Modal from './components/modal';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const [cartOpen, setCartOpen] = useState(false);

  const list = store.getState().list;
  const cartList = store.getCartList();
  const count = store.getCount();
  const sum = store.getSum();

  const callbacks = {
    onDeleteItem: useCallback(
      code => {
        store.deleteItem(code);
      },
      [store],
    ),

    onSelectItem: useCallback(
      code => {
        store.selectItem(code);
      },
      [store],
    ),

    onAddItem: useCallback(() => {
      store.addItem();
    }, [store]),

    onAddToCart: useCallback(
      code => {
        store.addToCart(code);
      },
      [store],
    ),

    onRemoveFromCart: useCallback(
      code => {
        store.removeFromCart(code);
      },
      [store],
    ),

    onOpenCart: useCallback(() => {
      setCartOpen(!cartOpen);
    }),
  };

  return (
    <PageLayout>
      {cartOpen ? <Modal onOpenCart={callbacks.onOpenCart} onClick={callbacks.onRemoveFromCart} list={cartList} sum={sum} title="Корзина" /> : null}
      <Head title="Магазин" />
      <Controls onOpenCart={callbacks.onOpenCart} sum={sum} count={count} />
      <List
        list={list}
        onClick={callbacks.onAddToCart}
      />
    </PageLayout>
  );
}

export default App;
