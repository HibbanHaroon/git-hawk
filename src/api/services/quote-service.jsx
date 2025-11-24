import { ENDPOINTS } from '../endpoints'
import QuoteModel from '../models/quote'
import { ninjaRequest, parseJSON } from '../client'

export async function getQuote() {
  try {
    const response = await ninjaRequest(`${ENDPOINTS.GET_RANDOM_QUOTE}`, {
      method: 'GET',
    })
    const data = await parseJSON(response)
    const quote = new QuoteModel(data[0])
    return quote
  } catch (error) {
    console.log('Error: ' + error)
    return null
  }
}
