# goldencross-deathcross
It's a tool to find golden cross (death cross) stocks.
The tool supports only japanese individual stocks.
And, I used simple moving average (5days, 25days) in order to find crossover stocks. 

## install

```
npm i goldencross-deathcross
```

## usage 
1. Please type a command

```
$ ./node_modules/.bin/find-crossover-signals
```

or

```
$ export PATH=$PATH:./node_modules/.bin
$ find-crossover-signals
```

2. Please choose crossover signals(golden cross or death cross)

  ```
  find-crossover-signals
  ? choose indicators … 
  ❯ golden
    death
  ```

3. Please choose industry that you want to analyze.
if you choose 'yourself', you are able to analyze symbols you entered.

```
? choose industry that we analyze stocks … 
❯ agricultureForestryFishes
  mining
  architecture
  food
  fiberPulp
  chemistry
  material
  machine
  vehicle
  finance
  it
  yourself
```

4. Please press the enter key.  Analysis is started.
The more symbols being analyzed, the more time it takes.

```
✔ choose industry that we analyze stocks · it
start analysis
406 symbols is being analyzed
We extracted 5 symbols
9404.T Nippon Television Holdings, Inc.
9444.T Toshin Holdings Co.,Ltd
9474.T Zenrin Co., Ltd.
9729.T TOKAI Corp.
9930.T Kitazawa Sangyo Co., Ltd.
```
