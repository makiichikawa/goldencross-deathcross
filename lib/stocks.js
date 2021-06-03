module.exports = class Stocks {
  constructor (industryOrSymbol) {
    this.industryOrSymbol = industryOrSymbol
  }

  async init () {
    const result = await this.getSymbols(this.industryOrSymbol)
    if (result.length === 0) {
      throw new Error("can't find ticker symbols")
    }
    this.nameMap = new Map()
    result.forEach((object) => {
      this.nameMap[object.symbol] = object.name
    })
    this.symbols = result.map(object => object.symbol)
  }

  async getRecentStocks (term) {
    const yahooStocks = require('yahoo-finance')
    const Period = require('./period')
    const period = new Period(term)
    const periodStr = period.getPeriod()
    return new Promise((resolve, reject) => {
      yahooStocks.historical({
        symbols: this.symbols,
        from: periodStr.start,
        to: periodStr.end,
        period: 'd'
      }).then((result) => {
        for (const symbol of this.symbols) {
          if (result[symbol].length === 0) {
            delete result[symbol]
          }
        }
        resolve(result)
      })
    })
  }

  async getSymbols (industryOrSymbol) {
    const symbolNumbers = {
      agricultureForestryFishes: this.createNumbers(1300, 1399),
      mining: this.createNumbers(1500, 1699),
      architecture: this.createNumbers(1700, 1999),
      food: this.createNumbers(2000, 2999),
      fiberPulp: this.createNumbers(3000, 3999),
      chemistry: this.createNumbers(4000, 4999),
      material: this.createNumbers(5000, 5999),
      machine: this.createNumbers(6000, 6999),
      vehicle: this.createNumbers(7000, 7999),
      finance: this.createNumbers(8000, 8999),
      it: this.createNumbers(9000, 9999)
    }

    const numbers = typeof industryOrSymbol === 'number' ? [industryOrSymbol] : symbolNumbers[industryOrSymbol]

    const promises = numbers.map(num => this.autoc(num))
    const promise = Promise.all(promises)

    return new Promise((resolve, reject) => {
      promise.then((value) => {
        resolve(value.filter(Boolean))
      })
    })
  }

  createNumbers (lower, upper) {
    return [...Array(upper - lower + 1)].map((_, i) => lower + i)
  }

  async autoc (num) {
    const yahooFinance2 = require('yahoo-finance2').default
    const result = (await yahooFinance2.autoc(num + '.T'))
      .Result
      .filter(elemnt => elemnt.symbol.match(/T$/))
    if (!(result.length === 0)) {
      return { symbol: result[0].symbol, name: result[0].name }
    }
  }
}
