#!/usr/bin/env node

main()
async function main () {
  const Stocks = require('./lib/stocks')
  const stocks = new Stocks()

  const Prompt = require('./lib/prompt')
  const indicatorsPrompt = new Prompt('choose indicators',
    'indicators',
    ['golden', 'death'])
  const indicator = await indicatorsPrompt.selectRun()

  const choices = Object.keys(stocks.symbolByIndustry)
  choices.push('yourself')
  const industryPrompt = new Prompt('choose industry that we analyze stocks',
    'industry',
    choices)
  let industryOrSymbol = await industryPrompt.selectRun()

  const Indicators = require('./lib/indicators')
  const indicators = new Indicators(stocks)
  if (industryOrSymbol === 'yourself') {
    const readlinePrompt = new Prompt('Please Enter symbols(four-digit-number. ex 2001, 2002)')
    industryOrSymbol = await readlinePrompt.readlineRun()
  }
  setTimeout(() => { console.log('start analysis') }, 500)
  const crossSymbols = await indicators.getCrossSymbols(indicator, industryOrSymbol)
  console.log('We extracted ' + crossSymbols.length + ' symbols')
  crossSymbols.forEach((symbol) => console.log(symbol))
}
