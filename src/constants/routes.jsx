import { Home, Profile } from '../pages'

export const publicRoutes = [
  {
    path: '/',
    component: <Home />,
  },
  {
    path: '/:username',
    component: <Profile />,
  },
]
