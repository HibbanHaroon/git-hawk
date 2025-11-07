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
