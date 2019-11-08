import React from 'react'

const routes = [
  {
    path: '/application',
    component: React.lazy(() => import(/* webpackChunkName: "PageApplication" */ './Views/Application'))
  },
  {
    path: '/terms-of-use',
    component: React.lazy(() => import(/* webpackChunkName: "PageTOS" */ './Views/TermsOfUse'))
  },
  {
    path: '/how-to-use-models',
    component: React.lazy(() => import(/* webpackChunkName: "PageHowToUseModels" */ './Views/HowToUseModels'))
  },
  {
    path: '/models/view/:slug',
    component: React.lazy(() => import(/* webpackChunkName: "PageSingleModel" */ './Views/Model'))
  },
  {
    path: '/models/:category',
    component: React.lazy(() => import(/* webpackChunkName: "PageModels" */ './Views/Models'))
  },
  {
    path: '/models',
    component: React.lazy(() => import(/* webpackChunkName: "PageModels" */ './Views/Models'))
  },
  {
    path: '/',
    component: React.lazy(() => import(/* webpackChunkName: "PageIndex" */ './Views/Home'))
  },
]

export default routes