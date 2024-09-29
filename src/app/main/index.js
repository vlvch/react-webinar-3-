import { memo, useCallback, useEffect } from 'react';
import Item from '../../components/item';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import BasketTool from '../../components/basket-tool';
import List from '../../components/list';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';
import Pagination from '../../components/pagination';
import { useNavigate } from 'react-router-dom';
import Spinner from '../../components/spinner';
import LangControl from '../../components/lang-control';
import Menu from '../../components/menu';
import Navigation from '../../components/navigation';

function Main() {
  const store = useStore();
  const navigate = useNavigate();

  useEffect(() => {
    store.actions.catalog.firstLoad();
  }, [store]);

  const select = useSelector(state => ({
    list: state.catalog.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
    pages: state.catalog.pages,
    currentPage: state.catalog.currentPage,
    loaded: state.catalog.loaded,
    locale: state.locale.currentLocale,
    words: state.locale.words,
  }));

  const words = select.words[select.locale];

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    // Загрузка товаров по номеру страницы
    loadPage: useCallback(page => store.actions.catalog.loadPage(page), [store]),
    // Загрузка текущего товара и переход на страницу
    openArticle: useCallback(_id => {
      store.actions.article.loadArticle(_id);
      navigate(`/article/${_id}`);
    }, [store]),
    // Cмена языка
    setLocale: useCallback((locale) => store.actions.locale.setLocale(locale), [store]),
  };

  const renders = {
    item: useCallback(
      item => {
        return <Item item={item} onAdd={callbacks.addToBasket} words={words} />;
      },
      [callbacks.addToBasket, words],
    ),
  };

  return (
    <PageLayout>
      <Head title={words.shop}>
        <LangControl onClick={callbacks.setLocale} locale={select.locale} />
      </Head>
      <Menu>
        <Navigation words={words} />
        <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum} words={words} />
      </Menu>
      {!select.loaded && <Spinner />}
      <List list={select.list} renderItem={renders.item} openArticle={callbacks.openArticle} />
      <Pagination pagesCount={select.pages} currentPage={select.currentPage} onClick={callbacks.loadPage} />
    </PageLayout >
  );
}

export default memo(Main);
