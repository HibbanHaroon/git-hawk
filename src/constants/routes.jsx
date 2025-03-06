import { Home, Profile } from '../pages'

export const HOME_ROUTE = '/'
export const PROFILE_ROUTE = '/:username'

export const publicRoutes = [
  {
    path: HOME_ROUTE,
    component: <Home />,
  },
  {
    path: PROFILE_ROUTE,
    component: <Profile />,
  },
]
