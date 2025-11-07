import { useState, useEffect } from 'react'
import { getDadJoke, getQuote, getRepositoryList, getUser } from '../../api'
import { getTopLanguages, getTopRepository } from '../../utils'
import iconsMap from '../../assets/files/icons-mapping.json'

function useProfileData(username) {
  const [user, setUser] = useState(null)
  const [repositories, setRepositories] = useState(null)
  const [quote, setQuote] = useState(null)
  const [joke, setJoke] = useState(null)
  const [topRepository, setTopRepository] = useState(null)
  const [topLanguages, setTopLanguages] = useState(null)

  useEffect(() => {
    async function fetchData() {
      const userData = await getUser(username)
      setUser(userData)

      const [repositoriesData, quoteData, jokeData] = await Promise.all([
        getRepositoryList(userData.reposUrl),
        getQuote(),
        getDadJoke(),
      ])

      setRepositories(repositoriesData)
      setQuote(quoteData)
      setJoke(jokeData)
      setTopRepository(getTopRepository(repositoriesData))

      const topLanguagesData = await getTopLanguages(repositoriesData)
      const topIcons = topLanguagesData.map((lang) => ({
        [lang]: iconsMap[lang] || 'default',
      }))
      setTopLanguages(topIcons)
    }

    fetchData()
  }, [username])

  return {
    user,
    repositories,
    quote,
    joke,
    topRepository,
    topLanguages,
  }
}

export default useProfileData
