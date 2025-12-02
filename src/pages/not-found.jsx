import { Flex, Typography, theme } from 'antd'

const { Text } = Typography
const { useToken } = theme

function NotFound404() {
  const { token } = useToken()

  return (
    <Flex
      vertical
      align="center"
      justify="center"
      style={{
        width: '100vw',
        height: '100vh',
        backgroundColor: token.colorPrimary,
        gap: '6rem',
      }}
    >
      <Text
        style={{
          fontFamily: 'Playfair Display',
          fontSize: 'clamp(8rem, 20vw, 20rem)',
          fontWeight: 700,
          color: token.colorAccent,
          lineHeight: 1,
        }}
      >
        404
      </Text>
      <Text
        style={{
          fontFamily: 'Montserrat',
          fontSize: 'clamp(1rem, 2vw, 1.5rem)',
          fontWeight: 400,
          color: token.colorText,
        }}
      >
        The user does not exist.
      </Text>
    </Flex>
  )
}

export default NotFound404
