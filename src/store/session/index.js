import StoreModule from '../module';

/**
 * Состояние авторизации
 */
class SessionState extends StoreModule {
  initState() {
    return {
      username: '',
      logged: false,
      error: false,
      errorMessages: [],
      waiting: false,
      token: '',
    };
  }

  /**
   * Авторизации с помощью токена
   */
  async initSession() {
    const token = window.localStorage.getItem('token');

    if (token) {
      const response = await fetch('/api/v1/users/self?fields=profile', {
        method: 'GET',
        headers: {
          'X-Token': token,
          'accept': 'application/json'
        }
      });
      const json = await response.json();

      const { profile } = json.result;

      if (json.result) {
        this.setState(
          {
            ...this.getState(),
            logged: true,
            token: token,
            username: profile.name,
          },
          'Авторизация через токен прошла успешно',
        );
      }
    }
  }

  /**
   * Авторизация
   */
  async logIn(data) {
    this.setState({ ...this.getState(), waiting: true })

    const response = await fetch('/api/v1/users/sign', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' }
    });
    const json = await response.json();

    if (json.error) {
      const errors = json.error.data.issues
        .filter((error) => error.message)
        .map((error) => error.message)

      this.setState(
        {
          ...this.getState(),
          error: true,
          waiting: false,
          errorMessages: errors
        },
        'Ошибка авторизации',
      );
    } else {
      window.localStorage.setItem('token', json.result.token);
      const { name } = json.result.user.profile;
      this.setState(
        {
          ...this.getState(),
          token: json.result.token,
          username: name,
          logged: true,
          error: false,
          waiting: false
        },
        'Авторизация прошла успешно',
      );
    }

  }

  /**
   * Выход из аккаунта
   */
  async logOut() {
    this.setState({ ...this.getState(), waiting: true })

    const token = this.getState().token
    const response = await fetch('/api/v1/users/sign', {
      method: 'DELETE',
      headers: {
        'X-Token': token,
        'Content-Type': 'application/json'
      }
    });
    const json = await response.json();
    if (json.result) {
      window.localStorage.removeItem('token')
      this.setState(this.initState());
    } else if (json.error) {
      setInterval(() => this.logOut(), 5000)
    }
  }

  async resetErrors() {
    this.setState({ ...this.getState(), error: false, errorMessages: [] })
  }
}

export default SessionState;