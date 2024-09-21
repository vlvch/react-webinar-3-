import { generateCode } from './utils';

/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.listeners = []; // Слушатели изменений состояния
    this.cart = [];
    this.cartSum = 0;
    this.cartCount = 0;
  }

  /**
   * Подписка слушателя на изменения состояния
   * @param listener {Function}
   * @returns {Function} Функция отписки
   */
  subscribe(listener) {
    this.listeners.push(listener);
    // Возвращается функция для удаления добавленного слушателя
    return () => {
      this.listeners = this.listeners.filter(item => item !== listener);
    };
  }

  /**
   * Выбор состояния
   * @returns {Object}
   */
  getState() {
    return this.state;
  }

  /**
   * Установка состояния
   * @param newState {Object}
   */
  setState(newState) {
    this.state = newState;
    // Вызываем всех слушателей
    for (const listener of this.listeners) listener();
  }

  /**
   * Добавление новой записи
   */
  addItem() {
    this.setState({
      ...this.state,
      list: [...this.state.list, { code: generateCode(), title: 'Новая запись' }],
    });
  }

  /**
   * Удаление записи по коду
   * @param code
   */
  deleteItem(code) {
    this.setState({
      ...this.state,
      // Новый список, в котором не будет удаляемой записи
      list: this.state.list.filter(item => item.code !== code),
    });
  }

  /**
   * Выделение записи по коду
   * @param code
   */
  selectItem(code) {
    this.setState({
      ...this.state,
      list: this.state.list.map(item => {
        if (item.code === code) {
          // Смена выделения и подсчёт
          return {
            ...item,
            selected: !item.selected,
            count: item.selected ? item.count : item.count + 1 || 1,
          };
        }
        // Сброс выделения если выделена
        return item.selected ? { ...item, selected: false } : item;
      }),
    });
  }

  /**
   * Добавление товара в корзину по коду
   * @param code
   */
  addToCart(code) {
    const findedItem = this.state.list.find(item => item.code === code);
    const itemInCart = this.cart.find(item => item.code === code);

    const newCart = itemInCart ?
      this.cart.map((item) => item.code === code ? { ...item, count: item.count + 1 } : item)
      :
      [...this.cart, { ...findedItem, count: 1 }];

    this.setCart(newCart);
    this.setCount(newCart.length);
    this.setSum(newCart.reduce((acc, item) => acc += item.count * item.price, 0));

    for (const listener of this.listeners) listener();
  }

  /**
   * Удаление товара из корзины по коду
   * @param code
   */
  removeFromCart(code) {
    const newCart = this.cart.filter(item => item.code !== code);

    this.setCart(newCart);
    this.setCount(newCart.length);
    this.setSum(newCart.reduce((acc, item) => acc += (item.count * item.price), 0));

    for (const listener of this.listeners) listener();
  }

  /**
   * Изменение суммы товара в корзине
   * @param newSum {Number}
   */
  setSum(newSum) {
    this.cartSum = newSum;
  }

  /**
   * Выбор суммы товара в корзине
   * @returns {Number}
   */
  getSum() {
    return this.cartSum;
  }

  /**
   * Изменение количества товара в корзине
   * @param newCount {Number}
   */
  setCount(newCount) {
    this.cartCount = newCount;
  }

  /**
   * Выбор количества товара в корзине
   * @returns {Number}
   */
  getCount() {
    return this.cartCount;
  }

  /**
   * Изменение корзины
   * @param newCart {Array}
   */
  setCart(newCart) {
    this.cart = newCart;
  }

  /**
   * Выбор корзины
   * @returns {Array}
   */
  getCart() {
    return this.cart;
  }
}

export default Store;
