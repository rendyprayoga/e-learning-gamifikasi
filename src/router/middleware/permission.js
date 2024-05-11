import { $auth } from '../../plugins/Auth';
import store from '../../store';

export default function (permission) {
  return async ({ next }) => {
    if (!$auth.isLoggedIn || !$auth.user.can(permission)) {
      store.commit('info/setError', {
        title: 'Akses Denied',
        description: "You don't have permission to access this page.",
      });
    }

    next();
  };
}
