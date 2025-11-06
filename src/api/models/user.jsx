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
    this.createdAt = data.created_at || null
  }

  toString() {
    const str = `
      id: ${this.id}
      name: ${this.name}
      imageUrl: ${this.imageUrl}
      company: ${this.company}
      location: ${this.location}
      bio: ${this.bio}
      publicRepos: ${this.bio}
      followers: ${this.followers}
      following: ${this.following}
      reposUrl: ${this.reposUrl}
      createdAt: ${this.createdAt}
    `
    return str
  }
}

export default UserModel
