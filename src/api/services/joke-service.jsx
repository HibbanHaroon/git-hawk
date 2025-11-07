import { ENDPOINTS } from '../endpoints'
import JokeModel from '../models/joke'

export async function getDadJoke() {
  try {
    const response = await fetch(`${ENDPOINTS.GET_DAD_JOKE}`, {
      method: 'GET',
      headers: {
        'X-Api-Key': import.meta.env.VITE_NINJA_API_URL,
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error('Failed to fetch')
    }

    const data = await response.json()
    const joke = new JokeModel(data[0])
    return joke
  } catch (error) {
    console.log('Error: ' + error)
    return null
  }
}
