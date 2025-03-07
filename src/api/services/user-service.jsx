import { ENDPOINTS } from '../endpoints'
import UserModel from '../models/user'

export async function getUser(username) {
  try {
    const response = await fetch(`${ENDPOINTS.GET_USERS}/${username}`)

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
