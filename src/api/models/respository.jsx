class Repository {
  constructor(data) {
    this.id = data.id || null
    this.name = data.name || null
    this.description = data.description || null
    this.url = data.html_url || null
    this.type = data.visibility == 'public' ? 'Public' : 'Private'
    this.stars = data.stargazers_count || 0
    this.language = data.language || null
    this.size = data.size || 0
  }

  toString() {
    const str = `
      id: ${this.id}
      name: ${this.name}
      description: ${this.description}
      url: ${this.url}
      type: ${this.type}
      stars: ${this.stars}
      language: ${this.language}
      size: ${this.size}
    `
    return str
  }
}

export default Repository
