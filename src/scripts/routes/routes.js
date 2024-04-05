import home from '../views/pages/home/home';
import favorite from '../views/pages/favorite/favorite';
import detail from '../views/pages/detail/detail';

const routes = {
  '/': home,
  '/favorit': favorite,
  '/detail/:id': detail,
};

export default routes;
