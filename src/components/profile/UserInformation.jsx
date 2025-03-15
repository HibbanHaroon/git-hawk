import { Flex, Avatar, Typography, Space, theme } from 'antd'
import { ASSETS } from '../../constants'

const { Text } = Typography
const { useToken } = theme

function UserInformation({ user }) {
  const { token } = useToken()
  return (
    <Flex vertical>
      <Flex justify="center">
        <Flex vertical>
          <Avatar size={80} src={user.imageUrl} />
        </Flex>
        <Flex vertical style={{ marginLeft: 24 }}>
          <Text
            style={{
              fontSize: 22,
              fontWeight: 600,
              color: token.colorAccent,
              marginBottom: 6,
            }}
          >
            {user.name}
          </Text>
          <Text
            style={{
              fontSize: 14,
              fontWeight: 400,
              color: token.colorAccent,
              marginBottom: 12,
            }}
          >
            {user.bio}
          </Text>
          <Flex style={{ width: '100%' }}>
            <Space>
              <img src={ASSETS.MAP_PIN_ICON} alt="Map Pin Icon" width={22} />
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: 400,
                  color: token.colorAccent,
                }}
              >
                {user.location}
              </Text>
            </Space>
            <Space style={{ marginLeft: 32 }}>
              <img src={ASSETS.COMPANY_ICON} alt="Company Icon" width={22} />
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: 400,
                  color: token.colorAccent,
                }}
              >
                {user.company}
              </Text>
            </Space>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default UserInformation
