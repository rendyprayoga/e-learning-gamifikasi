import qs from 'qs';
import Vue from 'vue';
import VueRouter from 'vue-router';
import middleware from './middleware';
import authMiddleware from './middleware/auth';
import guestMiddleware from './middleware/guest';
import permissionMiddleware from './middleware/permission';
import store from '../store';

import AuthLayout from '../layouts/AuthLayout';
import DefaultLayout from '../layouts/DefaultLayout';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    component: () => import('../views/Home.vue'),
    meta: { layout: DefaultLayout, middleware: [authMiddleware] },
  },

  {
    path: '/apis',
    component: () => import('../views/apis/Index'),
    meta: {
      layout: DefaultLayout,
      middleware: [authMiddleware, permissionMiddleware('apis.read')],
    },
  },
  {
    path: '/apis/add',
    component: () => import('../views/apis/Add'),
    meta: {
      layout: DefaultLayout,
      middleware: [authMiddleware, permissionMiddleware('apis.create')],
    },
  },
  {
    path: '/apis/:id',
    component: () => import('../views/apis/View'),
    meta: {
      layout: DefaultLayout,
      middleware: [authMiddleware, permissionMiddleware('apis.read')],
    },
  },
  {
    path: '/settings',
    component: () => import('../views/settings/Index'),
    meta: {
      layout: DefaultLayout,
      middleware: [authMiddleware, permissionMiddleware('rewards.read')],
    },
  },
  {
    path: '/settings/add',
    component: () => import('../views/settings/Add'),
    meta: {
      layout: DefaultLayout,
      middleware: [authMiddleware, permissionMiddleware('rewards.create')],
    },
  },
  {
    path: '/settings/:id/edit',
    component: () => import('../views/settings/Edit'),
    meta: {
      layout: DefaultLayout,
      middleware: [authMiddleware, permissionMiddleware('rewards.update')],
    },
  },
  {
    path: '/login',
    component: () => import('../views/Login'),
    meta: { layout: AuthLayout, middleware: [guestMiddleware] },
  },

  {
    path: '/profile',
    component: () => import('../views/Profile'),
    meta: { layout: DefaultLayout, middleware: [authMiddleware] },
  },

  {
    path: '/roles',
    component: () => import('../views/roles/Index'),
    meta: {
      layout: DefaultLayout,
      middleware: [authMiddleware, permissionMiddleware('roles.read')],
    },
  },
  {
    path: '/roles/add',
    component: () => import('../views/roles/Add'),
    meta: {
      layout: DefaultLayout,
      middleware: [authMiddleware, permissionMiddleware('roles.create')],
    },
  },
  {
    path: '/roles/:id',
    component: () => import('../views/roles/View'),
    meta: {
      layout: DefaultLayout,
      middleware: [authMiddleware, permissionMiddleware('roles.read')],
    },
  },
  {
    path: '/roles/:id/edit',
    component: () => import('../views/roles/Edit'),
    meta: {
      layout: DefaultLayout,
      middleware: [authMiddleware, permissionMiddleware('roles.update')],
    },
  },
  {
    path: '/users',
    component: () => import('../views/users/Index'),
    meta: {
      layout: DefaultLayout,
      middleware: [authMiddleware, permissionMiddleware('users.read')],
    },
  },
  {
    path: '/users/add',
    component: () => import('../views/users/Add'),
    meta: {
      layout: DefaultLayout,
      middleware: [authMiddleware, permissionMiddleware('users.create')],
    },
  },
  {
    path: '/users/:id',
    component: () => import('../views/users/View'),
    meta: {
      layout: DefaultLayout,
      middleware: [authMiddleware, permissionMiddleware('users.read')],
    },
  },
  {
    path: '/users/:id/edit',
    component: () => import('../views/users/Edit'),
    meta: {
      layout: DefaultLayout,
      middleware: [authMiddleware, permissionMiddleware('users.update')],
    },
  },
  {
    path: '/users/:id/reset-password',
    component: () => import('../views/users/ResetPassword'),
    meta: {
      layout: DefaultLayout,
      middleware: [authMiddleware, permissionMiddleware('users.update')],
    },
  },

  {
    path: '/reports',
    component: () => import('../views/reports/Index'),
    meta: {
      layout: DefaultLayout,
      middleware: [authMiddleware, permissionMiddleware('reports.read')],
    },
  },

  {
    path: '/categories',
    component: () => import('../views/categories/Index'),
    meta: {
      layout: DefaultLayout,
      middleware: [authMiddleware, permissionMiddleware('categories.read')],
    },
  },
  {
    path: '/categories/add',
    component: () => import('../views/categories/Add'),
    meta: {
      layout: DefaultLayout,
      middleware: [authMiddleware, permissionMiddleware('categories.create')],
    },
  },
  {
    path: '/categories/:id/edit',
    component: () => import('../views/categories/Edit'),
    meta: {
      layout: DefaultLayout,
      middleware: [authMiddleware, permissionMiddleware('categories.update')],
    },
  },
  {
    path: '/categories/:id',
    component: () => import('../views/categories/View'),
    meta: {
      layout: DefaultLayout,
      middleware: [authMiddleware, permissionMiddleware('categories.read')],
    },
  },
  {
    path: '/questions',
    component: () => import('../views/questions/Index'),
    meta: {
      layout: DefaultLayout,
      middleware: [authMiddleware, permissionMiddleware('questions.read')],
    },
  },
  {
    path: '/questions/answers/:id',
    component: () => import('../views/questions/View'),
    meta: {
      layout: DefaultLayout,
      middleware: [authMiddleware, permissionMiddleware('questions.read')],
    },
  },
  {
    path: '/questions/add/:categoryId',
    component: () => import('../views/questions/Add'),
    meta: {
      layout: DefaultLayout,
      middleware: [authMiddleware, permissionMiddleware('questions.create')],
    },
  },
  {
    path: '/questions/:categoryId/:id/edit',
    component: () => import('../views/questions/Edit'),
    meta: {
      layout: DefaultLayout,
      middleware: [authMiddleware, permissionMiddleware('questions.update')],
    },
  },
  {
    path: '/courses',
    component: () => import('../views/courses/Index'),
    meta: {
      layout: DefaultLayout,
      middleware: [authMiddleware, permissionMiddleware('course.read')],
    },
  },
  {
    path: '/courses/question/:idCategory',
    component: () => import('../views/courses/View'),
    meta: {
      layout: DefaultLayout,
      middleware: [authMiddleware, permissionMiddleware('course.read')],
    },
  },
  {
    path: '/badges',
    component: () => import('../views/badges/Index'),
    meta: {
      layout: DefaultLayout,
      middleware: [authMiddleware, permissionMiddleware('badge.read')],
    },
  },
  //  //  //  ###################################################################
  // {
  //   path: '/pages/',
  //   redirect: '/pages/about',
  // },
  // {
  //   path: '/pages/about',
  //   component: () => import('../views/pages/About'),
  //   meta: {
  //     layout: DefaultLayout,
  //     middleware: [authMiddleware, permissionMiddleware('pages.update')],
  //   },
  // },
  // {
  //   path: '/pages/faq',
  //   component: () => import('../views/pages/FAQ'),
  //   meta: {
  //     layout: DefaultLayout,
  //     middleware: [authMiddleware, permissionMiddleware('pages.update')],
  //   },
  // },
  // {
  //   path: '/pages/tac',
  //   component: () => import('../views/pages/TaC'),
  //   meta: {
  //     layout: DefaultLayout,
  //     middleware: [authMiddleware, permissionMiddleware('pages.update')],
  //   },
  // },
  //  //  //  ###################################################################

  {
    path: '*',
    component: () => import('../views/NotFound'),
  },
];

const router = new VueRouter({
  routes,
  parseQuery(query) {
    return qs.parse(query);
  },
  stringifyQuery(query) {
    const str = qs.stringify(query, { arrayFormat: 'indices', encode: false });
    return str ? `?${str}` : '';
  },
});

router.beforeEach((...args) => {
  // Reset error
  store.commit('info/setError', null);
  middleware(...args);
});

export default router;
