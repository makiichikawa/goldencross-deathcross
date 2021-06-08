const Stocks = require('../lib/stocks')

test('getstocks symbol 7928', async () => {
  const stocks = new Stocks()
  await stocks.init([7928])
  return stocks.getRecentStocks(1).then((result) => {
    expect(result['7928.T'][0].close).toBe(1101)
  })
})

test('getSymbols 2004', async () => {
  const stocks = new Stocks()
  const result = await stocks.getSymbols([2004])
  expect(result).toEqual([{ symbol: '2004.T', name: 'Showa Sangyo Co., Ltd.' }])
})

test('createNumbers (1300, 1304)', () => {
  const stocks = new Stocks()
  expect(stocks.createNumbers(1300, 1304)).toEqual([1300, 1301, 1302, 1303, 1304])
})

test('autoc(num) undefind', () => {
  const stocks = new Stocks()
  return stocks.autoc(2005).then((value) => {
    expect(value).toBe(undefined)
  })
})

test('autoc(num) 2004.T', () => {
  const stocks = new Stocks()
  return stocks.autoc(2004).then((value) => {
    expect(value).toEqual({ symbol: '2004.T', name: 'Showa Sangyo Co., Ltd.' })
  })
})
