const Indicators = require('../lib/indicators')
const indicators = new Indicators(7298)

test('isGoldenCross true', async () => {
  expect(indicators.isGoldenCross([2.1, 2], [2, 2])).toBe(true)
})

test('isGoldenCross true', async () => {
  expect(indicators.isGoldenCross([2.1, 1.9], [2, 2])).toBe(true)
})

test('isGoldenCross false', async () => {
  expect(indicators.isGoldenCross([2, 1.9], [2, 2])).toBe(false)
})

test('isDeathCross true', async () => {
  expect(indicators.isDeathCross([1.9, 2], [2, 2])).toBe(true)
})

test('isDeathCross true', async () => {
  expect(indicators.isDeathCross([1.9, 2.1], [2, 2])).toBe(true)
})

test('isDeathCross false', async () => {
  expect(indicators.isDeathCross([2.1, 2.1], [2, 2])).toBe(false)
})

test('calcMa([1, 2, 3], 2) = [1.5, 2.5]', async () => {
  const stockObjArray = [{ close: 1 }, { close: 2 }, { close: 3 }]
  const ma = await indicators.calcMa(stockObjArray, 2)
  expect(ma).toEqual([1.5, 2.5])
})
