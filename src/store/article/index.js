import StoreModule from '../module';

class Article extends StoreModule {
  initState() {
    return {
      item: {},
      loaded: true,
    };
  }

  /**
   * Загрузка выбранного товара
   * @param _id Код товара
   */
  async loadArticle(_id) {
    this.setState({ ...this.getState(), loaded: false },
      'Загрузка товара'
    )

    const response = await fetch(`/api/v1/articles/${_id}?fields=*,madeIn(title,code),category(title)`);
    const json = await response.json();

    this.setState({ item: json.result, loaded: true },
      'Товар загружен',
    );
  }
}

export default Article;
