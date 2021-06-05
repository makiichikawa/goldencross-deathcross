module.exports = class Prompt {
  constructor (message, name = null, choices = null) {
    if ((choices === null) && (name === null)) {
      this.message = message
    } else {
      const { Select } = require('enquirer')
      this.prompt = new Select({
        name: name,
        message: message,
        choices: choices
      })
    }
  }

  selectRun () {
    return new Promise((resolve, reject) => {
      this.prompt.run()
        .then((answer) => {
          resolve(answer)
        })
    })
  }

  async readlineRun () {
    const symbols = await this.readUserInput(this.message)
    return symbols
  }

  readUserInput (question) {
    const readline = require('readline').createInterface({
      input: process.stdin,
      output: process.stdout
    })

    return new Promise((resolve, reject) => {
      readline.question(question, (answer) => {
        resolve(answer.split(',').map((symbol) => { return Number(symbol.trim()) }))
        readline.close()
      })
    })
  }
}
