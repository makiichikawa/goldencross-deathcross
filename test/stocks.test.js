const Stocks = require('../lib/stocks')

test('getstocks symbol 7928', async () => {
  const stocks = new Stocks(7928)
  const data = await stocks.getRecentStocks(1)
  await expect(data['7928.T'][0].close).toBe(1062)
})
