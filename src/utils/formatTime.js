export const formatDate = ms => {
  const date = new Date(ms)

  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const year = date.getFullYear()

  return `${month}/${day}/${year}`
}

export const formatTimeDifference = milliseconds => {
  const now = new Date()
  const postedDate = new Date(milliseconds)
  const timeDifference = now - postedDate

  const seconds = Math.floor(timeDifference / 1000)
  if (seconds < 60) {
    return `${seconds} second${getEnglishPlural(seconds)} ago`
  }

  const minutes = Math.floor(timeDifference / (1000 * 60))
  if (minutes < 60) {
    return `${minutes} minute${getEnglishPlural(minutes)} ago`
  }

  const hours = Math.floor(timeDifference / (1000 * 60 * 60))
  if (hours < 24) {
    return `${hours} hour${getEnglishPlural(hours)} ago`
  }

  const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24))
  if (days < 7) {
    return `${days} day${getEnglishPlural(days)} ago`
  }

  const weeks = Math.floor(timeDifference / (1000 * 60 * 60 * 24 * 7))
  if (weeks < 4) {
    return `${weeks} week${getEnglishPlural(weeks)} ago`
  }

  const months = Math.floor(timeDifference / (1000 * 60 * 60 * 24 * 30))
  if (months < 12) {
    return `${months} month${getEnglishPlural(months)} ago`
  }

  const years = Math.floor(timeDifference / (1000 * 60 * 60 * 24 * 365))
  return `${years} year${getEnglishPlural(years)} ago`
}

const getEnglishPlural = number => {
  return number !== 1 ? 's' : ''
}