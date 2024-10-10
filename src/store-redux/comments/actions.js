export default {
  /**
   * Загрузка комментариев
   * @param id
   * @return {Function}
   */
  load: id => {
    return async (dispatch, getState, services) => {
      // Сброс текущего товара и установка признака ожидания загрузки
      dispatch({ type: 'comments/load-start' });
      try {
        const res = await services.api.request({
          url: `/api/v1/comments?fields=items(_id,text,dateCreate,author(profile(name)),parent(_id,_type),isDeleted),count&limit=*&search[parent]=${id}`,
        });
        // Товар загружен успешно
        dispatch({ type: 'comments/load-success', payload: { data: res.data.result } });
      } catch (e) {
        //Ошибка загрузки
        dispatch({ type: 'comments/load-error' });
      }
    };
  },
  sendComment: (user, parentId, text, token) => {
    const data = {
      "text": text,
      "parent": { "_id": parentId, "_type": "article" }
    }
    return async (dispatch, getState, services) => {
      dispatch({ type: 'comments/send-start' });
      try {
        const res = await services.api.request({
          url: '/api/v1/comments',
          method: 'POST',
          headers: {
            'X-Token': token,
          },
          body: JSON.stringify(data),
        });
        // Комментарий отправлен успешно
        dispatch({ type: 'comments/send-success', payload: { data: { ...res.data.result, author: user } } });
      } catch (e) {
        //Ошибка загрузки
        dispatch({ type: 'comments/send-error' });
      }
    }
  },
  sendAnswer: (user, parentId, text, token) => {
    const data = {
      "text": text,
      "parent": { "_id": parentId, "_type": "comment" }
    }
    return async (dispatch, getState, services) => {
      dispatch({ type: 'comments/send-start' });
      try {
        const res = await services.api.request({
          url: '/api/v1/comments',
          method: 'POST',
          headers: {
            'X-Token': token,
          },
          body: JSON.stringify(data),
        });
        // Комментарий отправлен успешно
        dispatch({ type: 'comments/send-success', payload: { data: { ...res.data.result, author: user } } });
      } catch (e) {
        console.log(e)
        //Ошибка загрузки
        dispatch({ type: 'comments/send-error' });
      }
    }
  },
};
