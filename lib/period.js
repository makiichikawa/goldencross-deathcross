module.exports = class Period {
  constructor (term) {
    this.term = term
  }

  getPeriod () {
    const endDate = new Date()
    while (this.identifyHoliday(endDate)) {
      endDate.setDate(endDate.getDate() - 1)
    }

    const startDate = new Date(
      endDate.getFullYear(),
      endDate.getMonth(),
      endDate.getDate()
    )
    let numberOfBusinessDay = 0
    while (true) {
      startDate.setDate(startDate.getDate() - 1)
      if (!this.identifyHoliday(startDate)) {
        numberOfBusinessDay++
      }
      // 時間帯によって本日の株価が取れない可能性があるので、term+2個分の株価をとるようにstartDateを調整
      if (numberOfBusinessDay === this.term + 1) {
        break
      }
    }

    // yahoo-financeは終了日を含まないで、ヒストリカルデータを取りにいくので、プラス1しておく
    endDate.setDate(endDate.getDate() + 1)

    return {
      start: this.dateToString(startDate),
      end: this.dateToString(endDate)
    }
  }

  identifyHoliday (date) {
    const JapaneseHolidays = require('japanese-holidays')
    const publicHoliday = (typeof (JapaneseHolidays.isHoliday(date)) === 'string')
    const saturday = (date.getDay() === 6)
    const sunday = (date.getDay() === 0)
    return publicHoliday || saturday || sunday
  }

  dateToString (date) {
    const yearStr = date.getFullYear().toString()
    const monthStr = ('0' + (date.getMonth() + 1).toString()).slice(-2)
    const dateStr = ('0' + date.getDate().toString()).slice(-2)

    return [yearStr, monthStr, dateStr].join('-')
  }
}
