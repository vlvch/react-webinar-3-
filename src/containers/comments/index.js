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

function Comments(props) {
  const { id = '' } = props
  const dispatch = useDispatch();
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
    }),
    shallowequal,
  );

  const oldSelect = useOldSelector(
    state => ({
      token: state.session.token,
      user: state.session.user,
    }),
    shallowequal,
  )

  const callbacks = {
    // Выбор комментария для ответа
    onSelect: useCallback(_id => setSelectedId(_id), [selectedId]),
    // Сброс ответа
    onCancel: useCallback(() => setSelectedId(id), [selectedId]),
    // Отправка комментария
    onComment: useCallback((text) => dispatch(commentsActions.sendComment(oldSelect.user, id, text, oldSelect.token)), [oldSelect.token]),
    // Отправка ответа 
    onAnswer: useCallback((_id, text) => {
      setSelectedId(id);
      dispatch(commentsActions.sendAnswer(oldSelect.user, _id, text, oldSelect.token))
    }, [oldSelect.token]),
  };

  const { t } = useTranslate();

  const options = {
    comments: useMemo(() => commentsFormat(select.comments), [select.comments],),
  };

  const renders = {
    item: useCallback(
      item => (
        <ItemComment
          _id={item._id}
          labelText={item.text}
          labelDate={item.dateCreate}
          labelName={item.author?.profile?.name}
          level={item.level}
          onSelect={() => callbacks.onSelect(item._id)}
        >
          {
            ((selectedId !== id && selectedId === item.parent._id && item.last)
              ||
              (item.children.length === 0 && selectedId === item._id))
            &&
            <ProtectedAnswer>
              <CommentAnswer t={t} onClick={callbacks.onAnswer} onCancel={callbacks.onCancel} _id={selectedId} />
              <CommentStub t={t} onCancel={callbacks.onCancel} />
            </ProtectedAnswer>
          }
        </ItemComment>
      ),
      [selectedId, t],
    ),
  };

  return (
    <SideLayout side={'start'} padding={'large'}>
      <Spinner active={select.waiting}>
        <HeadComments count={select.count} t={t} />
        <List list={options.comments} renderItem={renders.item} gap={'medium'} border={'false'} />
        {selectedId === id &&
          <ProtectedAnswer>
            <ArticleAnswer t={t} onClick={callbacks.onComment} />
            <ArticleStub t={t} />
          </ProtectedAnswer>
        }
      </Spinner>
    </SideLayout>
  );
}

export default memo(Comments);
