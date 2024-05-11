import { $auth } from '../../plugins/Auth';

export default function auth({ next }) {
  const handle = () => {
    const path = $auth.isLoggedIn ? '/' : undefined;
    next(path);
  };

  if ($auth.isLoading) {
    $auth.watch('isLoading', handle, { once: true });
  } else {
    handle();
  }
}
