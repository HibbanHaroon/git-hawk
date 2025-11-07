import { ENDPOINTS } from '../endpoints'
import UserModel from '../models/user'

export async function getUser(username) {
  try {
    const GITHUB_HEADERS = {
      Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
      Accept: 'application/vnd.github+json',
    }

    const response = await fetch(`${ENDPOINTS.GET_USERS}/${username}`, {
      headers: GITHUB_HEADERS,
    })

    if (!response.ok) {
      throw new Error('Failed to fetch')
    }

    const data = await response.json()
    const user = new UserModel(data)
    return user
  } catch (error) {
    console.log('Error: ' + error)
    return null
  }
}
