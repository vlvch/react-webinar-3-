import React, { useCallback, useState } from 'react';
import List from './components/list';
import Controls from './components/controls';
import Head from './components/head';
import PageLayout from './components/page-layout';
import Cart from './components/cart';
import Item from './components/item';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const [cartOpen, setCartOpen] = useState(false);

  const list = store.getState().list;
  const cartList = store.getCart();
  const count = store.getCount();
  const sum = store.getSum();

  const callbacks = {
    toggleModal: useCallback(() => {
      document.body.classList = (!cartOpen ? 'body body_no-scroll' : 'body');
      setCartOpen(!cartOpen);
    }),

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

    renderItem: useCallback(
      (item, onClick) => {
        return <Item item={item} onClick={onClick} />
      }, [],
    ),
  };

  return (
    <PageLayout>
      {cartOpen &&
        <Cart toggleModal={callbacks.toggleModal}
          onClick={callbacks.onRemoveFromCart}
          list={cartList}
          sum={sum} />
      }
      <Head title="Магазин" />
      <Controls toggleModal={callbacks.toggleModal} sum={sum} count={count} />
      <List
        list={list}
        onClick={callbacks.onAddToCart}
        renderItem={callbacks.renderItem}
      />
    </PageLayout>
  );
}

export default App;
