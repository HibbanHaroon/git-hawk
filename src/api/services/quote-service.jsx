import { ENDPOINTS } from '../endpoints'
import QuoteModel from '../models/quote'

export async function getQuote() {
  try {
    const response = await fetch(`${ENDPOINTS.GET_RANDOM_QUOTE}`, {
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
    const quote = new QuoteModel(data[0])
    return quote
  } catch (error) {
    console.log('Error: ' + error)
    return null
  }
}
