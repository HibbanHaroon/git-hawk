class UserModel {
  constructor(data) {
    this.id = data.id || null
    this.name = data.name || null
    this.imageUrl = data.avatar_url || null
    this.company = data.company || null
    this.location = data.location || null
    this.bio = data.bio || null
    this.publicRepos = data.public_repos || 0
    this.followers = data.followers || 0
    this.following = data.following || 0
    this.reposUrl = data.repos_url || null
  }
}

export default UserModel
