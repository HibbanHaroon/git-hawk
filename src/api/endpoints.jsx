const _BASE_URL = 'https://api.github.com'
const _NINJA_URL = 'https://api.api-ninjas.com'

export const ENDPOINTS = {
  GET_USERS: `${_BASE_URL}/users`,
  GET_RANDOM_QUOTE: `${_NINJA_URL}/v2/randomquotes`,
  GET_DAD_JOKE: `${_NINJA_URL}/v1/dadjokes`,
  GET_HISTORICAL_EVENT: `${_NINJA_URL}/v1/historicalevents`,
}
