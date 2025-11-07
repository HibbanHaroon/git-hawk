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

export function getTopRepo(repositories) {
  let repository = repositories[0]
  for (let i = 1; i < repositories.length; i++) {
    if (repository.size < repositories[i].size) {
      repository = repositories[i]
    }
  }

  return repository
}
