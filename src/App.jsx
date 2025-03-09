import { ConfigProvider } from 'antd'
import { Route, Routes } from 'react-router-dom'
import { theme, publicRoutes } from './constants'
import { CursorLayout } from './layouts'

function App() {
  return (
    <ConfigProvider theme={theme}>
      <CursorLayout>
        <Routes>
          {publicRoutes.map((route, index) => (
            <Route key={index} path={route.path} element={route.component} />
          ))}
        </Routes>
      </CursorLayout>
    </ConfigProvider>
  )
}

export default App
