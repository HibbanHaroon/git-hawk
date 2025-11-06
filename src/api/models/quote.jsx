class Quote {
  constructor(data) {
    this.quote = data.quote || null
    this.author = data.author || null
    this.categories = data.categories || []
  }

  toString() {
    const str = `
      quote: ${this.quote}
      author: ${this.author}
      categories: ${this.categories}
    `
    return str
  }
}

export default Quote
