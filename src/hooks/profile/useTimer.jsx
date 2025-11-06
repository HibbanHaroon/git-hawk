import { useEffect, useState } from 'react'

function useTimer(createdAt) {
  const [time, setTime] = useState(() => new Date() - new Date(createdAt))

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date() - new Date(createdAt))
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return { time }
}

export default useTimer
