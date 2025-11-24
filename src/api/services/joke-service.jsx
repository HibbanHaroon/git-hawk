import { ENDPOINTS } from '../endpoints'
import JokeModel from '../models/joke'
import { ninjaRequest, parseJSON } from '../client'

export async function getDadJoke() {
  try {
    const response = await ninjaRequest(`${ENDPOINTS.GET_DAD_JOKE}`, {
      method: 'GET',
    })
    const data = await parseJSON(response)
    const joke = new JokeModel(data[0])
    return joke
  } catch (error) {
    console.log('Error: ' + error)
    return null
  }
}
