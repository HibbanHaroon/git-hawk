class Joke {
  constructor(data) {
    this.joke = data.joke || null
  }

  toString() {
    const str = `
      joke: ${this.joke}
    `
    return str
  }
}

export default Joke
