const Stocks = require('../lib/stocks')

test('getstocks symbol 7928', async () => {
  const stocks = new Stocks(7928)
  return stocks.getRecentStocks(1).then((result) => {
    expect(result['7928.T'][0].close).toBe(1041)
  })
})

test('getSymbols food', async () => {
  const stocks = new Stocks(2004)
  const result = await stocks.getSymbols(2004)
  expect(result).toContain('2004.T')
})

test('createNumbers (1300, 1304)', () => {
  const stocks = new Stocks('food')
  expect(stocks.createNumbers(1300, 1304)).toEqual([1300, 1301, 1302, 1303, 1304])
})

test.skip('autoc(num) undefind', () => {
  const stocks = new Stocks(2005)
  return stocks.autoc(2005).then((value) => {
    expect(value).toBe(undefined)
  })
})

test('autoc(num) 2004.T', () => {
  const stocks = new Stocks(2004)
  return stocks.autoc(2004).then((value) => {
    expect(value).toBe('2004.T')
  })
})
