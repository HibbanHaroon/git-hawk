import { Flex, Typography, Space, Grid, theme } from 'antd'
import { ASSETS } from '../../constants'
import { getTopRepo } from '../../utils'

const { Text } = Typography
const { useBreakpoint } = Grid
const { useToken } = theme

function TopRepository({ repositories }) {
  const { token } = useToken()
  const repository = getTopRepo(repositories)
  const screens = useBreakpoint()
  const isMobile = !screens.md

  return (
    <Flex
      vertical
      style={{
        padding: 'clamp(1.5rem, 4vw, 3.5rem) clamp(1rem, 3vw, 3rem)',
        borderRadius: 'clamp(1rem, 3vw, 2rem)',
        backgroundColor: token.colorSecondary,
      }}
    >
      <Flex justify="center" gap={isMobile ? 'clamp(1rem, 3vw, 3rem)' : 32}>
        <Flex vertical gap={24}>
          <Text
            style={{
              fontFamily: 'Playfair Display',
              fontSize: 'clamp(1rem, 1.5vw, 1.5rem)',
              fontStyle: 'italic',
              fontWeight: 700,
              color: token.colorAccent,
            }}
          >
            Your Top Repository
          </Text>
          <Flex
            gap={16}
            style={{
              display: 'flex',
              justifyContent: 'flex-start',
              alignItems: 'center',
            }}
          >
            <img
              src={ASSETS.REPO_ICON}
              alt="Repository Icon"
              style={{
                width: 'clamp(16px, 2vw, 24px)',
                height: 'auto',
              }}
            />
            <Text
              style={{
                fontFamily: 'Montserrat',
                fontSize: 'clamp(1rem, 1.5vw, 1.5rem)',
                fontWeight: 600,
                color: token.colorAccent,
                lineHeight: '0',
              }}
            >
              {repository.name}
            </Text>
          </Flex>
          {repository.description && (
            <Text
              style={{
                fontFamily: 'Montserrat',
                fontSize: 'clamp(0.7rem, 1.35vw, 1.35rem)',
                fontWeight: 400,
                color: token.colorAccent,
                lineHeight: '1.3',
              }}
            >
              {repository.description}
            </Text>
          )}
          <Flex
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            {repository.language && (
              <Space style={{ gap: 16 }}>
                <img
                  src={ASSETS.LANGUAGE_ICON}
                  alt="Language Icon"
                  style={{
                    width: 'clamp(16px, 2vw, 24px)',
                    height: 'auto',
                  }}
                />
                <Text
                  style={{
                    fontFamily: 'Montserrat',
                    fontSize: 'clamp(0.7rem, 1.35vw, 1.35rem)',
                    fontWeight: 400,
                    color: token.colorAccent,
                  }}
                >
                  {repository.language}
                </Text>
              </Space>
            )}
            <Space style={{ gap: 16 }}>
              <img
                src={ASSETS.STAR_ICON}
                alt="Star Icon"
                style={{
                  width: 'clamp(24px, 3vw, 35px)',
                  height: 'auto',
                }}
              />
              <Text
                style={{
                  fontFamily: 'Montserrat',
                  fontSize: 'clamp(0.7rem, 1.35vw, 1.35rem)',
                  fontWeight: 400,
                  color: token.colorAccent,
                }}
              >
                {repository.stars}
              </Text>
            </Space>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default TopRepository
