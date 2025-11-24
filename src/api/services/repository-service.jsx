import RepositoryModel from '../models/respository'
import { githubRequest, parseJSON } from '../client'

export async function getRepositoryList(url) {
  try {
    const response = await githubRequest(url)
    const data = await parseJSON(response)
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
    const response = await githubRequest(url)
    const data = await parseJSON(response)
    return data
  } catch (error) {
    console.log('Error: ' + error)
    return null
  }
}
