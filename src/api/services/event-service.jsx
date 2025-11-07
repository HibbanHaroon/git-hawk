import { getRandomNumber } from '../../utils'
import { ENDPOINTS } from '../endpoints'
import EventModel from '../models/event'

export async function getHistoricalEvent(month, day) {
  try {
    const response = await fetch(
      `${ENDPOINTS.GET_HISTORICAL_EVENT}?month=${month}&day=${day}`,
      {
        method: 'GET',
        headers: {
          'X-Api-Key': import.meta.env.VITE_NINJA_API_URL,
          'Content-Type': 'application/json',
        },
      }
    )

    if (!response.ok) {
      throw new Error('Failed to fetch')
    }

    const data = await response.json()
    const event = new EventModel(data[getRandomNumber(0, data.length)])
    return event
  } catch (error) {
    console.log('Error: ' + error)
    return null
  }
}
