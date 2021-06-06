module.exports = class Indicators {
  constructor (stocks) {
    this.stocks = stocks
    this.shortTerm = 5
    this.mediumTerm = 25
  }

  async getCrossSymbols (goldenOrDeath, industryOrSymbol) {
    try {
      await this.stocks.init(industryOrSymbol)
      console.log(await this.stocks.symbols.length + ' symbols is being analyzed')
      const mediumTermStocks = await this.stocks.getRecentStocks(this.mediumTerm)
      const promises = Object.keys(mediumTermStocks).map(async (key) => {
        return await this.isCrossSymbol(key, mediumTermStocks, goldenOrDeath)
      })
      const promise = Promise.all(promises)
      return new Promise((resolve, reject) => {
        promise.then((value) => {
          resolve(value.filter(Boolean))
        })
      })
    } catch (error) {
      console.log(error.message)
    }
  }

  async isCrossSymbol (key, stocks, goldenOrDeath) {
    const shortTermMa = await this.calcMa(stocks[key].slice(0, this.shortTerm + 1), this.shortTerm)
    const mediumTermMa = await this.calcMa(stocks[key], this.mediumTerm)
    if ((goldenOrDeath === 'golden') && (this.isGoldenCross(shortTermMa, mediumTermMa))) {
      return key + ' ' + this.stocks.nameMap[key]
    }
    if ((goldenOrDeath === 'death') && (this.isDeathCross(shortTermMa, mediumTermMa))) {
      return key + ' ' + this.stocks.nameMap[key]
    }
  }

  async calcMa (stockObjArray, term) {
    const Ma = require('moving-averages')
    const closeStock = []
    for (const stockobj of stockObjArray) {
      closeStock.push(stockobj.close)
    }
    return (await Ma.ma(closeStock, term)).slice(-2)
  }

  isGoldenCross (shortTermMa, mediumTermMa) {
    return shortTermMa[0] > mediumTermMa[0] && shortTermMa[1] <= mediumTermMa[1]
  }

  isDeathCross (shortTermMa, mediumTermMa) {
    return shortTermMa[0] < mediumTermMa[0] && shortTermMa[1] >= mediumTermMa[1]
  }
}
