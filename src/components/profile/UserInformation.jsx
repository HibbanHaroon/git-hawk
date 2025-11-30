import { Flex, Avatar, Typography, Space, Grid, theme } from 'antd'
import { ASSETS } from '../../constants'

const { Text } = Typography
const { useBreakpoint } = Grid
const { useToken } = theme

function UserInformation({ user }) {
  const { token } = useToken()
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
        <Flex vertical justify="center">
          <Avatar
            size={{ xs: 72, sm: 72, md: 120, lg: 120, xl: 180, xxl: 180 }}
            src={user.imageUrl}
            style={{ filter: 'grayscale(100%)' }}
          />
        </Flex>
        <Flex vertical gap={24}>
          <Flex vertical gap={4}>
            <Text
              style={{
                fontFamily: 'Playfair Display',
                fontSize: 'clamp(1.2rem, 2.1vw, 2.1rem)',
                fontWeight: 700,
                color: token.colorAccent,
              }}
            >
              {user.name}
            </Text>
            <Text
              style={{
                fontFamily: 'Montserrat',
                fontSize: 'clamp(0.7rem, 1.35vw, 1.35rem)',
                fontWeight: 400,
                color: token.colorAccent,
                lineHeight: '1.3',
              }}
            >
              {user.bio}
            </Text>
          </Flex>
          <Flex
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            {user.location && (
              <Space style={{ gap: 16 }}>
                <img
                  src={ASSETS.MAP_PIN_ICON}
                  alt="Map Pin Icon"
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
                  {user.location}
                </Text>
              </Space>
            )}
            {user.company && (
              <Space style={{ gap: 16 }}>
                <img
                  src={ASSETS.COMPANY_ICON}
                  alt="Company Icon"
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
                    whiteSpace: 'nowrap',
                  }}
                >
                  {user.company}
                </Text>
              </Space>
            )}
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default UserInformation
