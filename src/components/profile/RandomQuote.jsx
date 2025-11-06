import { Flex, Typography, theme } from 'antd'
import { ASSETS } from '../../constants'

const { useToken } = theme
const { Text } = Typography

function RandomQuote({ quote }) {
  const { token } = useToken()

  return (
    <Flex
      vertical
      style={{
        padding: 'clamp(1.5rem, 4vw, 3.5rem) clamp(1rem, 3vw, 3rem)',
        borderRadius: 'clamp(1rem, 3vw, 2rem)',
        backgroundColor: token.colorSecondary,
        gap: 'clamp(0.7rem, 2vw, 2rem)',
      }}
    >
      <Flex justify="start" align="middle">
        <img
          src={ASSETS.OPEN_QUOTE_ICON}
          alt="Open Quote Icon"
          style={{
            width: 'clamp(24px, 4vw, 40px)',
            height: 'auto',
          }}
        />
      </Flex>
      <Flex justify="center" align="middle">
        <Text
          style={{
            fontFamily: 'Playfair Display',
            fontSize: 'clamp(1rem, 1.5vw, 1.5rem)',
            fontStyle: 'italic',
            fontWeight: 700,
            color: token.colorAccent,
            textAlign: 'center',
            width: '80%',
          }}
        >
          {quote.quote}
        </Text>
      </Flex>
      <Flex justify="end" align="middle">
        <img
          src={ASSETS.CLOSED_QUOTE_ICON}
          alt="Closed Quote Icon"
          style={{
            width: 'clamp(24px, 3.5vw, 40px)',
            height: 'auto',
          }}
        />
      </Flex>
    </Flex>
  )
}

export default RandomQuote
