import { ENDPOINTS } from '../endpoints'
import UserModel from '../models/user'
import { githubRequest, parseJSON } from '../client'

export async function getUser(username) {
  try {
    const response = await githubRequest(`${ENDPOINTS.GET_USERS}/${username}`)
    const data = await parseJSON(response)
    const user = new UserModel(data)
    return { user, error: null }
  } catch (error) {
    console.log('Error: ' + error)
    // Check if error message contains 404 status
    const is404 = error.message && error.message.includes('404')
    return { user: null, error: is404 ? 'USER_NOT_FOUND' : 'UNKNOWN_ERROR' }
  }
}
