import { $auth } from '../../plugins/Auth';

export default async ({ next }) => {
  const handle = () => {
    const path = $auth.isLoggedIn ? undefined : '/login';
    next(path);
  };

  if ($auth.isLoading) {
    $auth.watch('isLoading', handle, { once: true });
  } else {
    handle();
  }
};
