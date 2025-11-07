import { Flex, Typography, theme } from 'antd'

const { useToken } = theme
const { Text } = Typography

function DadJoke({ joke }) {
  const { token } = useToken()

  return (
    <Flex
      vertical
      justify="middle"
      align="center"
      style={{
        padding: 'clamp(1.5rem, 4vw, 3.5rem) clamp(1rem, 3vw, 3rem)',
        borderRadius: 'clamp(1rem, 3vw, 2rem)',
        backgroundColor: token.colorSecondary,
        gap: 'clamp(0.7rem, 2vw, 2rem)',
      }}
    >
      <Text
        style={{
          fontFamily: 'Playfair Display',
          fontSize: 'clamp(1rem, 1.5vw, 1.5rem)',
          fontStyle: 'italic',
          fontWeight: 700,
          color: token.colorAccent,
          textAlign: 'center',
        }}
      >
        {joke.joke}
      </Text>
      <Text
        style={{
          fontFamily: 'Montserrat',
          fontSize: 'clamp(0.7rem, 1.35vw, 1.35rem)',
          fontWeight: 400,
          color: token.colorAccent,
        }}
      >
        A cool dad joke for you
      </Text>
    </Flex>
  )
}

export default DadJoke
