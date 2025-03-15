import { Flex, theme } from 'antd'
import { useParams } from 'react-router-dom'
import { useProfileData } from '../hooks'
import { UserInformation } from '../components'

const { useToken } = theme

function Profile() {
  const { token } = useToken()
  const { username } = useParams()
  const { user, repositories } = useProfileData(username)

  if (user == null || repositories == null) {
    return <>Loading...</>
  }

  return (
    <Flex
      align="center"
      vertical
      style={{
        backgroundColor: token.colorPrimary,
        width: '100vw',
        height: '100vh',
      }}
    >
      <Flex
        vertical
        style={{ width: '70%', paddingTop: 24, paddingBottom: 24 }}
      >
        <UserInformation user={user} />
        {/* <p>{user.name}</p>
      {repositories.map((repsitory) => (
        <p key={repsitory.id}>{repsitory.name}</p>
      ))} */}
      </Flex>
    </Flex>
  )
}

export default Profile
