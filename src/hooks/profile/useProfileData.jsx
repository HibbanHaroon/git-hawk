import { useState, useEffect } from 'react'
import { getDadJoke, getQuote, getRepositoryList, getUser } from '../../api'

function useProfileData(username) {
  const [user, setUser] = useState(null)
  const [repositories, setRepositories] = useState(null)
  const [quote, setQuote] = useState(null)
  const [joke, setJoke] = useState(null)

  useEffect(() => {
    async function fetchData() {
      const userData = await getUser(username)
      setUser(userData)

      const repositoriesData = await getRepositoryList(userData.reposUrl)
      setRepositories(repositoriesData)

      const quoteData = await getQuote()
      setQuote(quoteData)

      const jokeData = await getDadJoke()
      setJoke(jokeData)
    }

    fetchData()
  }, [username])

  return {
    user,
    repositories,
    quote,
    joke,
  }
}

export default useProfileData
