import { ConfigProvider } from 'antd'
import { Route, Routes } from 'react-router-dom'
import { theme, publicRoutes } from './constants'

function App() {
  const root = document.documentElement

  root.style.setProperty('--clr-primary', theme.token.colorPrimary)
  root.style.setProperty('--clr-secondary', theme.token.colorSecondary)
  root.style.setProperty('--clr-neutral', theme.token.colorNeutral)

  return (
    <ConfigProvider theme={theme}>
      <Routes>
        {publicRoutes.map((route, index) => (
          <Route key={index} path={route.path} element={route.component} />
        ))}
      </Routes>
    </ConfigProvider>
  )
}

export default App
