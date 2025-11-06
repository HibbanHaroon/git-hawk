// Ms means milliseconds
// This function will convert time in 2021-05-06T06:51:19Z to 6y 2mon 56d 3h 6m 57s
export function transformTimeToWords(timeMs) {
  const seconds = Math.floor(timeMs / 1000)

  const years = Math.floor(seconds / (365 * 24 * 60 * 60))
  const months = Math.floor(
    (seconds % (365 * 24 * 60 * 60)) / (30 * 24 * 60 * 60)
  )
  const days = Math.floor((seconds % (30 * 24 * 60 * 60)) / (24 * 60 * 60))
  const hours = Math.floor((seconds % (24 * 60 * 60)) / (60 * 60))
  const minutes = Math.floor((seconds % (60 * 60)) / 60)
  const secs = seconds % 60

  // Format: "6y 2mon 56d 3h 6m 57s"
  const parts = []
  if (years) parts.push(`${years}y`)
  if (months) parts.push(`${months}mon`)
  if (days) parts.push(`${days}d`)
  if (hours) parts.push(`${hours}h`)
  if (minutes) parts.push(`${minutes}m`)
  if (secs) {
    parts.push(`${secs}s`)
  } else {
    parts.push('0s')
  }

  return parts.join(' ')
}
