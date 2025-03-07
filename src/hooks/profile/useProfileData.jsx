import { useState, useEffect } from 'react'
import { getRepositoryList, getUser } from '../../api'

function useProfileData(username) {
  const [user, setUser] = useState(null)
  const [repositories, setRepositories] = useState(null)

  useEffect(() => {
    async function fetchData() {
      const userData = await getUser(username)
      setUser(userData)

      const repositoriesData = await getRepositoryList(userData.reposUrl)
      setRepositories(repositoriesData)
    }

    fetchData()
  }, [username])

  return {
    user,
    repositories,
  }
}

export default useProfileData
