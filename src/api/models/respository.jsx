class Repository {
  constructor(data) {
    this.id = data.id || null
    this.name = data.name || null
    this.description = data.description || null
    this.url = data.html_url || null
    this.type = data.private == 'false' ? 'Public' : 'Private'
    this.stars = data.stargazers_count || 0
    this.language = data.langauge || null
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
    `
    return str
  }
}

export default Repository
