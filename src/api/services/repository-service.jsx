import { RepositoryModel } from '../models/respository'

export async function getRepositoryList(url) {
  try {
    const response = await fetch(url)

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
