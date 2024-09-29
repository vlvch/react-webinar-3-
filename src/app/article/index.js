import { memo, useCallback, useEffect } from 'react';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import BasketTool from '../../components/basket-tool';
import ItemArticle from '../../components/item-article';
import Spinner from '../../components/spinner';
import LangControl from '../../components/lang-control';
import Menu from '../../components/menu';
import Navigation from '../../components/navigation';
import { useParams } from 'react-router-dom';

function Article() {
  const store = useStore();
  const params = useParams();

  const select = useSelector(state => ({
    amount: state.basket.amount,
    sum: state.basket.sum,
    loaded: state.article.loaded,
    id: state.article.item._id,
    title: state.article.item.title,
    description: state.article.item.description,
    edition: state.article.item.edition,
    category: state.article.item.category?.title,
    country: state.article.item.madeIn?.title,
    countryCode: state.article.item.madeIn?.code,
    price: state.article.item.price,
    loaded: state.article.loaded,
    locale: state.locale.currentLocale,
    words: state.locale.words,
  }));

  const words = select.words[select.locale];

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    // Cмена языка
    setLocale: useCallback((locale) => store.actions.locale.setLocale(locale), [store]),
    // Загрузка текущего товара и переход на страницу
    openArticle: useCallback(_id => {
      store.actions.modals.close()
      store.actions.article.loadArticle(_id);
    }, [store])
  };


  useEffect(() => {
    params.id && callbacks.openArticle(params.id)
  }, [])

  return (
    <PageLayout>
      <Head title={select.title}>
        <LangControl onClick={callbacks.setLocale} locale={select.locale} />
      </Head>
      <Menu>
        <Navigation words={words} />
        <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum} words={words} />
      </Menu>
      {!select.loaded && <Spinner />}
      <ItemArticle
        words={words}
        id={select.id}
        onAdd={callbacks.addToBasket}
        description={select.description}
        edition={select.edition}
        category={select.category}
        country={select.country}
        countryCode={select.countryCode}
        price={select.price} />
    </PageLayout >
  );
}

export default memo(Article);
