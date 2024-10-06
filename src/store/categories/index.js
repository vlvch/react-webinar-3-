import StoreModule from '../module';

/**
 * Состояние списка категорий
 */
class CategoriesState extends StoreModule {
  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      categories: [],
    };
  }

  /**
   * Инициализация спика категорий.
   */
  async initCategories() {
    const response = await fetch('/api/v1/categories?fields=_id,title,parent(_id)&limit=*');
    const json = await response.json();

    this.setState(
      {
        ...this.getState(),
        categories: [{ _id: '', title: 'Все' }, ...json.result.items],
      },
      'Загружен список категорий',
    );
  }

}

export default CategoriesState;
