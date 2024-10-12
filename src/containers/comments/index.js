import { memo, useCallback, useMemo, useState } from 'react';
import useTranslate from '../../hooks/use-translate';
import useOldSelector from '../../hooks/use-selector';
import List from '../../components/list';
import Spinner from '../../components/spinner';
import shallowequal from 'shallowequal';
import ItemComment from '../../components/item-comment';
import useInit from '../../hooks/use-init';
import { useDispatch, useSelector } from 'react-redux';
import commentsActions from '../../store-redux/comments/actions';
import SideLayout from '../../components/side-layout';
import HeadComments from '../../components/head-comments';
import ArticleAnswer from '../../components/article-answer';
import ProtectedAnswer from '../protected-answer';
import ArticleStub from '../../components/article-stub';
import CommentAnswer from '../../components/comment-answer';
import CommentStub from '../../components/comment-stub';
import commentsFormat from '../../utils/comments-format';
import PropTypes from 'prop-types';
import { useLocation, useNavigate } from 'react-router-dom';

function Comments(props) {
  const { id = '' } = props
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedId, setSelectedId] = useState(id);

  useInit(() => {
    dispatch(commentsActions.load(id));
  }, [id]);

  const select = useSelector(
    state => ({
      comments: state.comments.items,
      count: state.comments.count,
      waiting: state.comments.waiting,
      token: state.session?.token,
      id: state.article.data._id
    }),
    shallowequal,
  );
  const oldSelect = useOldSelector(
    state => ({
      token: state.session.token,
      user: state.session.user,
      userId: state.session.user._id
    }),
    shallowequal,
  )

  const callbacks = {
    // Выбор комментария для ответа
    onSelect: useCallback(_id => setSelectedId(_id), [selectedId]),
    // Сброс ответа
    onCancel: useCallback(() => setSelectedId(id), [selectedId]),
    // Отправка комментария
    onComment: useCallback((text) => {
      text.trim().length &&
        dispatch(commentsActions.sendComment(oldSelect.user, id, text, oldSelect.token, 'article'))
    }, [oldSelect.token]),
    // Отправка ответа 
    onAnswer: useCallback((_id, text) => {
      if (text.trim().length) {
        setSelectedId(id)
        dispatch(commentsActions.sendComment(oldSelect.user, _id, text, oldSelect.token, 'comment'))
      }
    }, [oldSelect.token]),
    // Переход к авторизации
    onSignIn: useCallback(() => {
      navigate('/login', { state: { back: location.pathname } });
    }, [location.pathname]),
  };

  const { t } = useTranslate();

  const commentSpace = selectedId === id ?
    null
    :
    { _id: 'commentSpace', commentSpace: true, parent: { _id: selectedId } };

  const options = {
    comments: useMemo(() => commentsFormat(select.comments, commentSpace), [select.comments, commentSpace],),
  };

  const renders = {
    item: useCallback(
      item => (
        item.hasOwnProperty('commentSpace') ?
          <ProtectedAnswer scroll={true}>
            <CommentAnswer level={item.level} t={t} onClick={callbacks.onAnswer} onCancel={callbacks.onCancel} _id={selectedId} />
            <CommentStub level={item.level} t={t} onCancel={callbacks.onCancel} onSignIn={callbacks.onSignIn} />
          </ProtectedAnswer>
          :
          <ItemComment
            labelText={item.text}
            labelDate={item.dateCreate}
            labelName={item.author?.profile?.name}
            labelAnswer={t("comment.answer")}
            level={item.level}
            onSelect={() => callbacks.onSelect(item._id)}
            color={item.author._id === oldSelect.userId ? 'gray' : 'black'}
          />
      ),
      [selectedId, t, oldSelect.userId],
    ),
  };

  return (
    <SideLayout side={'start'} padding={'large'} width={'100'}>
      <Spinner active={select.waiting}>
        <HeadComments count={select.count} t={t} />
        <List list={options.comments} renderItem={renders.item} gap={'medium'} border={'false'} />
        {selectedId === id &&
          <ProtectedAnswer>
            <ArticleAnswer t={t} onClick={callbacks.onComment} />
            <ArticleStub t={t} onSignIn={callbacks.onSignIn} />
          </ProtectedAnswer>
        }
      </Spinner>
    </SideLayout>
  );
}

Comments.PropTypes = {
  id: PropTypes.string,
};

export default memo(Comments);
