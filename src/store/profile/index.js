import StoreModule from '../module';

/**
 * Состояние профиля
 */
class ProfileState extends StoreModule {
  initState() {
    return {
      profile: {},
      email: ''
    };
  }

  /**
   * Загрузка профиля
   */
  async loadProfile() {
    const token = window.localStorage.getItem('token');

    if (token) {

      const response = await fetch('api/v1/users/self?fields=*', {
        method: 'GET',
        headers: {
          'X-Token': token,
          'accept': 'application/json'
        }
      });

      const json = await response.json();

      if (json.result) {
        const { profile, email } = json.result;

        this.setState(
          {
            profile: profile,
            email: email,
          },
          'Профиль загружен',
        );
      }
    }
  }
}

export default ProfileState;
