module.exports = class Indicators {
  constructor (industryOrSymbols) {
    const Stocks = require('./stocks')
    this.stocks = new Stocks(industryOrSymbols)
    this.shortTerm = 5
    this.mediumTerm = 25
  }

  async getCrossSymbols (goldenOrDeath) {
    const shortTermStocks = await this.stocks.getRecentStocks(this.shortTerm)
    const mediumTermStocks = await this.stocks.getRecentStocks(this.mediumTerm)
    Object.keys(shortTermStocks).forEach(async (key) => {
      const shortTermMa = await this.calcMa(shortTermStocks[key], this.shortTerm)
      const mediumTermMa = await this.calcMa(mediumTermStocks[key], this.mediumTerm)
      if ((goldenOrDeath === 'golden') && (this.isGoldenCross(shortTermMa, mediumTermMa))) {
        console.log(key)
      }
      if ((goldenOrDeath === 'death') && (this.isDeathCross(shortTermMa, mediumTermMa))) {
        console.log(key)
      }
    })
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