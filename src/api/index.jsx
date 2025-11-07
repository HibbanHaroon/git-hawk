export { ENDPOINTS } from './endpoints'

export { default as UserModel } from './models/user'
export { default as RepositoryModel } from './models/respository'
export { default as QuoteModel } from './models/quote'
export { default as JokeModel } from './models/joke'
export { default as EventModel } from './models/event'

export { getUser } from './services/user-service'
export {
  getRepositoryList,
  getRepoLanguages,
} from './services/repository-service'
export { getQuote } from './services/quote-service'
export { getDadJoke } from './services/joke-service'
export { getHistoricalEvent } from './services/event-service'
