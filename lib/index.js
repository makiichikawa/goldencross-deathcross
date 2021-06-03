#!/usr/bin/env node

main()
async function main () {
  const Indicators = require('../lib/indicators')
  const indicators = new Indicators('food')
  await indicators.plotCrossSymbols('golden')
}
