import { getRandomNumber } from '../../utils'
import { ENDPOINTS } from '../endpoints'
import EventModel from '../models/event'
import { ninjaRequest, parseJSON } from '../client'

export async function getHistoricalEvent(month, day) {
  try {
    const response = await ninjaRequest(
      `${ENDPOINTS.GET_HISTORICAL_EVENT}?month=${month}&day=${day}`,
      {
        method: 'GET',
      }
    )
    const data = await parseJSON(response)
    const event = new EventModel(data[getRandomNumber(0, data.length)])
    return event
  } catch (error) {
    console.log('Error: ' + error)
    return null
  }
}
