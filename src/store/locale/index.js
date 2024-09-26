import StoreModule from '../module';

class Locale extends StoreModule {
  initState() {
    return {
      currentLocale: 'ru',
      words: {
        ru: {
          edition: 'Год выпуска',
          category: 'Категория',
          country: 'Страна произдовитель',
          price: 'Цена',
          main: 'Главная',
          incart: 'В корзине',
          go: 'Перейти',
          close: 'Закрыть',
          add: 'Добавить',
          remove: 'Удалить',
          items: {
            one: 'товар',
            few: 'товара',
            many: 'товаров',
          },
          shop: 'Магазин',
          cart: 'Корзина',
          pcs: 'шт',
          total: 'Итого',
          empty: 'Пусто'
        },
        en: {
          edition: 'Edition',
          category: 'Category',
          country: 'Сountry of origin',
          price: 'Price',
          main: 'Main',
          incart: 'In cart',
          go: 'Go in cart',
          close: 'Close',
          add: 'Add',
          remove: 'Remove',
          items: {
            one: 'item',
            few: 'items',
            many: 'items'
          },
          shop: 'Shop',
          cart: 'Cart',
          pcs: 'pcs',
          total: 'Total',
          empty: 'Empty'
        }
      }
    };
  }

  setLocale(locale) {
    this.setState({ ...this.getState(), currentLocale: locale });
  }
}

export default Locale;
