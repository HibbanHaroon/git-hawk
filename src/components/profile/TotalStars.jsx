import { Flex, Space, Typography, theme } from 'antd'
import { countRepoStars } from '../../utils'
import { ASSETS } from '../../constants'

const { useToken } = theme
const { Text } = Typography

function TotalStars({ repositories }) {
  const { token } = useToken()
  const totalStars = countRepoStars(repositories)

  const POPULAR_THRESHOLD = 10
  const isPopular = totalStars > POPULAR_THRESHOLD

  const title = isPopular ? "You're popular" : 'Nobody knows your work'
  const subtitle = isPopular
    ? `You’ve earned a total of ${totalStars} ${
        totalStars == 1 ? 'star' : 'stars'
      } across all your repos.`
    : `You've only earned ${totalStars} ${
        totalStars == 1 ? 'star' : 'stars'
      } for your entire career.`

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
      <Space style={{ gap: 'clamp(16px, 2vw, 24px)' }}>
        <img
          src={ASSETS.STAR_ICON}
          alt="Star Icon"
          style={{
            width: 'clamp(32px, 4vw, 64px)',
            height: 'auto',
          }}
        />
        <Text
          style={{
            fontFamily: 'Playfair Display',
            fontSize: 'clamp(24px, 4vw, 48px)',
            fontWeight: 700,
            color: token.colorAccent,
            lineHeight: '0.2',
            textAlign: 'center',
          }}
        >
          {totalStars}
        </Text>
      </Space>
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
        {title}
      </Text>
      <Text
        style={{
          fontFamily: 'Montserrat',
          fontSize: 'clamp(0.7rem, 1.35vw, 1.35rem)',
          fontWeight: 400,
          color: token.colorAccent,
        }}
      >
        {subtitle}
      </Text>
    </Flex>
  )
}

export default TotalStars
