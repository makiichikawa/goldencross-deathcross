module.exports = class Stocks {
  constructor (industryOrSymbol) {
    if (typeof industryOrSymbol === 'number') {
      this.symbols = [industryOrSymbol + '.T']
    } else {
      this.symbols = this.getSymbols(industryOrSymbol)
    }
  }

  getRecentStocks (term) {
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

  getSymbols (industry) {
    const symbolNumbers = {
      agricultureForestryFishes: [1300, 1399],
      mining: [1500, 1699],
      architecture: [1700, 1999],
      food: [2000, 2999],
      fiberPulp: [3000, 3999],
      chemistry: [4000, 4999],
      material: [5000, 5999],
      machine: [6000, 6999],
      vehicle: [7000, 7999],
      finance: [8000, 8999],
      it: [9000, 9999]
    }
    const symbols = []
    for (let num = symbolNumbers[industry][0]; num <= symbolNumbers[industry][1]; num++) {
      symbols.push(num + '.T')
    }
    return symbols
  }
}
