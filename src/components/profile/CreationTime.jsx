import { Flex, Typography, theme } from 'antd'
import { transformTimeToWords } from '../../utils'
import { useTimer } from '../../hooks'

const { useToken } = theme
const { Text } = Typography

function CreationTime({ user }) {
  const { token } = useToken()
  const { time } = useTimer(user.createdAt)
  const originTime = transformTimeToWords(time)

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
          fontSize: 'clamp(1.2rem, 2.1vw, 2.1rem)',
          fontStyle: 'italic',
          fontWeight: 700,
          color: token.colorAccent,
          textAlign: 'center',
        }}
      >
        {originTime}
      </Text>
      <Text
        style={{
          fontFamily: 'Montserrat',
          fontSize: 'clamp(0.7rem, 1.35vw, 1.35rem)',
          fontWeight: 400,
          color: token.colorAccent,
        }}
      >
        How old is your account?
      </Text>
    </Flex>
  )
}

export default CreationTime
