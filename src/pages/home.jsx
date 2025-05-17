import { Flex, Typography, Input, theme } from 'antd'
import { ASSETS } from '../constants'
import { SearchTextfield, SemiCirclesContainer } from '../components'

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
        overflow: 'hidden',
        position: 'relative',
        backgroundColor: token.colorPrimary,
      }}
    >
      <Flex justify="center" align="center" vertical style={{ zIndex: '10' }}>
        <img src={ASSETS.GITHUB_ICON} alt="Github Icon" />
        <Text
          style={{
            fontFamily: 'Playfair Display',
            fontSize: 'clamp(2rem, 5vw, 5rem)',
            lineHeight: 'normal',
            color: token.colorAccent,
            marginBlock: '12px 16px',
          }}
        >
          Hawk your Git
        </Text>
        <Text
          style={{
            fontFamily: 'Montserrat',
            fontSize: 'clamp(0.7rem, 1.2vw, 1.2rem)',
            marginTop: '1rem',
            lineHeight: 'normal',
            textAlign: 'center',
            color: token.colorAccent,
          }}
        >
          A minimalist platform where you can look for your GitHub stats.
        </Text>
        <SearchTextfield />
      </Flex>
      <SemiCirclesContainer />
    </Flex>
  )
}

export default Home
