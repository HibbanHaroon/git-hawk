import { useState, useEffect } from 'react'
import { getHistoricalEvent } from '../../api'
import { getDay, getMonth } from '../../utils'

function useHistoricalEvent(date) {
  const [event, setEvent] = useState(null)

  useEffect(() => {
    if (!date) return

    async function fetchData() {
      const month = getMonth(date)
      const day = getDay(date)
      const eventData = await getHistoricalEvent(month, day)
      setEvent(eventData)
    }

    fetchData()
  }, [date])

  return {
    event,
  }
}

export default useHistoricalEvent
