const Period = require('../lib/period')

test('identifyHoliday saturday', () => {
  const period = new Period(1)
  const date = new Date(2021, 4, 29)
  expect(period.identifyHoliday(date)).toBe(true)
})

test('identifyHoliday sunday', () => {
  const period = new Period(1)
  const date = new Date(2021, 4, 30)
  expect(period.identifyHoliday(date)).toBe(true)
})

test('identifyHoliday japanese holiday', () => {
  const period = new Period(1)
  const date = new Date(2021, 7, 11)
  expect(period.identifyHoliday(date)).toBe(true)
})

test('identifyHoliday ordinaly day', () => {
  const period = new Period(1)
  const date = new Date(2021, 4, 31)
  expect(period.identifyHoliday(date)).toBe(false)
})

test('datetostring 20210504', () => {
  const period = new Period(1)
  const date = new Date(2021, 4, 4)
  expect(period.dateToString(date)).toBe('2021-05-04')
})

test('datetostring 20211111', () => {
  const period = new Period(1)
  const date = new Date(2021, 10, 11)
  expect(period.dateToString(date)).toBe('2021-11-11')
})

test('getPeiod term=3', () => {
  const period = new Period(3)
  expect(period.getPeriod()).toEqual({ start: '2021-06-02', end: '2021-06-09' })
})

test('getPeiod term=18', () => {
  const period = new Period(18)
  expect(period.getPeriod()).toEqual({ start: '2021-05-12', end: '2021-06-09' })
})
