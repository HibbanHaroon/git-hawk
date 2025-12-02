import { Home, Profile, NotFound404 } from '../pages'

export const HOME_ROUTE = '/'
export const PROFILE_ROUTE = '/:username'
export const NOT_FOUND_ROUTE = '/not-found'

export const publicRoutes = [
  {
    path: HOME_ROUTE,
    component: <Home />,
  },
  {
    path: NOT_FOUND_ROUTE,
    component: <NotFound404 />,
  },
  {
    path: PROFILE_ROUTE,
    component: <Profile />,
  },
]
