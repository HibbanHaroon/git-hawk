import { Flex, Typography, Input, theme } from 'antd'
import { ASSETS } from '../constants'
import { SearchTextfield } from '../components'

const { Text } = Typography
const { useToken } = theme

function Home() {
  const { token } = useToken()

  return (
    <Flex
      justify="center"
      align="center"
      vertical
      style={{
        width: '100vw',
        height: '100vh',
        backgroundColor: token.colorPrimary,
      }}
    ></Flex>
  )
}

export default Home
