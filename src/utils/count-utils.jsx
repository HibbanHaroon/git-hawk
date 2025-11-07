import { getRepoLanguages } from '../api'

export function countRepoStars(repositories) {
  let count = 0
  for (let i = 0; i < repositories.length; i++) {
    count += repositories[i].stars
  }

  return count
}

export function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export function getTopRepository(repositories) {
  let repository = repositories[0]
  for (let i = 1; i < repositories.length; i++) {
    if (repository.size < repositories[i].size) {
      repository = repositories[i]
    }
  }

  return repository
}

// export async function getTopLanguages(repositories) {
//   let languagesMap = {}

//   for (let i = 0; i < repositories.length; i++) {
//     const languages = await getRepoLanguages(repositories[i].languagesUrl)

//     if (!languages) continue

//     for (const [lang, bytes] of Object.entries(languages)) {
//       languagesMap[lang] = (languagesMap[lang] || 0) + bytes
//     }
//   }

//   const entries = Object.entries(languagesMap)
//     .sort((a, b) => b[1] - a[1]) // sort descending by bytes
//     .slice(0, 4)

//   return entries.map(([lang]) => lang)
// }

export async function getTopLanguages(repositories) {
  let languagesMap = {}

  for (let i = 0; i < repositories.length; i++) {
    const language = repositories[i].language

    if (!language) continue

    languagesMap[language] = (languagesMap[language] || 0) + 1
  }

  const entries = Object.entries(languagesMap)
    .sort((a, b) => b[1] - a[1]) // sort descending by bytes
    .slice(0, 4)

  return entries.map(([lang]) => lang)
}
