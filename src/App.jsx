import { ConfigProvider } from 'antd'
import { Route, Routes } from 'react-router-dom'
import { theme, publicRoutes } from './constants'

function App() {
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
