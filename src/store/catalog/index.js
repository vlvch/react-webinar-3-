import { codeGenerator } from '../../utils';
import StoreModule from '../module';

class Catalog extends StoreModule {
  constructor(store, name) {
    super(store, name);
    this.generateCode = codeGenerator(0);
  }

  initState() {
    return {
      list: [],
      pages: 0,
      currentPage: 1,
      loaded: true
    };
  }

  setLoading() {
    this.setState({ ...this.getState(), loaded: false })
  }

  async firstLoad() {
    this.setLoading();
    const response = await fetch('/api/v1/articles?limit=10&fields=items(_id, title, price),count');
    const json = await response.json();

    const pagesCount = Math.ceil(json.result.count / 10);

    this.setState(
      {
        ...this.getState(),
        list: json.result.items,
        pages: pagesCount,
        loaded: true,
      },
      'Загружены товары из АПИ',
    );
  }

  async loadPage(page) {
    this.setLoading()
    const skip = page === 1 ? 0 : (10 * (page - 1));

    const response = await fetch(`/api/v1/articles?limit=10&skip=${skip}&fields=items(_id, title, price)`);
    const json = await response.json();

    this.setState(
      {
        ...this.getState(),
        list: json.result.items,
        currentPage: page,
        loaded: true,
      },
      `Загружены товары страницы ${page} из АПИ`,
    );
  }
}

export default Catalog;
