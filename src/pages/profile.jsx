import { useParams } from 'react-router-dom'
import { useProfileData } from '../hooks'

function Profile() {
  const { username } = useParams()
  const { user, repositories } = useProfileData(username)

  if (user == null || repositories == null) {
    return <>Loading...</>
  }

  return (
    <>
      <p>{user.name}</p>
      {repositories.map((repsitory) => (
        <p key={repsitory.id}>{repsitory.name}</p>
      ))}
    </>
  )
}

export default Profile
