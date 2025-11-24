import { ENDPOINTS } from '../endpoints'
import UserModel from '../models/user'
import { githubRequest, parseJSON } from '../client'

export async function getUser(username) {
  try {
    const response = await githubRequest(`${ENDPOINTS.GET_USERS}/${username}`)
    const data = await parseJSON(response)
    const user = new UserModel(data)
    return user
  } catch (error) {
    console.log('Error: ' + error)
    return null
  }
}
