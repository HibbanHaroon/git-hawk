import RepositoryModel from '../models/respository'

const GITHUB_HEADERS = {
  Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
  Accept: 'application/vnd.github+json',
}

export async function getRepositoryList(url) {
  try {
    const response = await fetch(url, { headers: GITHUB_HEADERS })

    if (!response.ok) {
      throw new Error('Failed to fetch repository data')
    }

    const data = await response.json()
    const repositories = data.map(
      (repository) => new RepositoryModel(repository)
    )
    return repositories
  } catch (error) {
    console.log('Error: ' + error)
    return null
  }
}

export async function getRepoLanguages(url) {
  try {
    const response = await fetch(url, { headers: GITHUB_HEADERS })

    if (!response.ok) {
      throw new Error('Failed to fetch languages')
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.log('Error: ' + error)
    return null
  }
}
