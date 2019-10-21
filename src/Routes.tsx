import loadable from "@loadable/component"

const routes = [
  {
    path: '/terms-of-use',
    component: loadable(() => import('./Views/TermsOfUse'))
  },
  {
    path: '/models/view/:slug',
    component: loadable(() => import('./Views/Model'))
  },
  {
    path: '/models/:category',
    component: loadable(() => import('./Views/Models'))
  },
  {
    path: '/models',
    component: loadable(() => import('./Views/Models'))
  },
  {
    path: '/',
    component: loadable(() => import('./Views/Home'))
  },
]

export default routes