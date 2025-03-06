import { useParams } from 'react-router-dom'

function Profile() {
  const { username } = useParams()

  return <>{username}</>
}

export default Profile
