export function countRepoStars(repositories) {
  let count = 0
  for (let i = 0; i < repositories.length; i++) {
    count += repositories[i].stars
  }

  return count
}
