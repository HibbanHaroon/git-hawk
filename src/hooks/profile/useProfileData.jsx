import { useState, useEffect } from 'react'
import { getDadJoke, getQuote, getRepositoryList, getUser } from '../../api'
import { getTopLanguages, getTopRepository } from '../../utils'
import iconsMap from '../../assets/files/icons-mapping.json'

/**
 * Custom hook for fetching GitHub profile data.
 *
 * Splits data fetching into two phases:
 * 1. Critical data (user, repositories) - fetched immediately for initial render
 * 2. Lazy data (quote, joke, topRepository, topLanguages) - fetched after critical data loads
 *
 * This optimization allows the page to render faster by only waiting for
 * essential data before showing content.
 *
 * @param {string} username - GitHub username to fetch data for
 * @returns {Object} Profile data including user, repositories, and lazy-loaded content
 */
function useProfileData(username) {
  // Critical data - needed for initial render (UserInformation and GeneralInformation cards)
  const [user, setUser] = useState(null)
  const [repositories, setRepositories] = useState(null)
  const [error, setError] = useState(null)

  // Lazy data - fetched after initial render (other cards)
  const [quote, setQuote] = useState(null)
  const [joke, setJoke] = useState(null)
  const [topRepository, setTopRepository] = useState(null)
  const [topLanguages, setTopLanguages] = useState(null)

  // Fetch critical data first (user and repositories)
  // This is the minimum data needed to show the first two cards
  useEffect(() => {
    async function fetchCriticalData() {
      const { user: userData, error: userError } = await getUser(username)

      if (userError) {
        setError(userError)
        setUser(null)
        return
      }

      setUser(userData)
      setError(null)

      // Fetch repositories after user data is available
      if (userData?.reposUrl) {
        const repositoriesData = await getRepositoryList(userData.reposUrl)
        setRepositories(repositoriesData)
      }
    }

    fetchCriticalData()
  }, [username])

  // Fetch lazy data after critical data is loaded
  // This allows the page to render immediately with the first 2 cards
  // while other cards load progressively
  useEffect(() => {
    // Don't fetch lazy data until critical data is available
    if (!user || !repositories) return

    async function fetchLazyData() {
      // Fetch quote and joke in parallel (they're independent)
      const [quoteData, jokeData] = await Promise.all([
        getQuote(),
        getDadJoke(),
      ])

      setQuote(quoteData)
      setJoke(jokeData)

      // Process repositories for top repository and languages
      // These depend on repositories data, so they're processed here
      setTopRepository(getTopRepository(repositories))

      const topLanguagesData = await getTopLanguages(repositories)
      const topIcons = topLanguagesData.map((lang) => ({
        [lang]: iconsMap[lang] || 'default',
      }))
      setTopLanguages(topIcons)
    }

    fetchLazyData()
  }, [user, repositories])

  return {
    user,
    repositories,
    quote,
    joke,
    topRepository,
    topLanguages,
    error,
  }
}

export default useProfileData
