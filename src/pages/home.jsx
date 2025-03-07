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
        backgroundColor: token.colorNeutral,
      }}
    >
      {/* <img src={ASSETS.GITHUB_ICON} alt="Github Icon" width={'10%'} />
      <Text
        style={{
          fontSize: '2rem',
          fontWeight: '700',
          color: token.colorPrimary,
        }}
      >
        Hawk a user too
      </Text> */}
      <SearchTextfield />
    </Flex>
  )
}

export default Home
