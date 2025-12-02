import { ConfigProvider } from 'antd'
import { Route, Routes } from 'react-router-dom'
import { theme, publicRoutes } from './constants'
import { CursorLayout } from './layouts'
import { Loader } from './components'
import { useFontLoader } from './hooks'

function App() {
  const { fontsReady, isTransitioning } = useFontLoader()

  return (
    <ConfigProvider theme={theme}>
      {!fontsReady && <Loader isTransitioning={isTransitioning} />}
      {fontsReady && (
        <CursorLayout>
          <Routes>
            {publicRoutes.map((route, index) => (
              <Route key={index} path={route.path} element={route.component} />
            ))}
          </Routes>
        </CursorLayout>
      )}
    </ConfigProvider>
  )
}

export default App
