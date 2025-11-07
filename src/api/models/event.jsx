class Event {
  constructor(data) {
    this.event = data.event || null
    this.year = data.year || null
    this.month = data.month || null
    this.day = data.day || null
  }

  toString() {
    const str = `
      event: ${this.event}
      year: ${this.year}
      month: ${this.month}
      day: ${this.day}
    `
    return str
  }
}

export default Event
