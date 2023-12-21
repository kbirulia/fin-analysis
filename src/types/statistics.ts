export enum Ratios {
  priceToEarnings = 'priceToEarnings',
  PEG = 'PEG',
  priceToSales = 'priceToSales',
  priceToBook = 'priceToBook',
  dividendPayout = 'dividendPayout',
  dividendYield = 'dividendYield',
  ROA = 'ROA',
  ROE = 'ROE',
  profitMargin = 'profitMargin',
  EPS = 'EPS',
  depthToEquity = 'depthToEquity',
  currentRatio = 'currentRatio',
  beta = 'beta',
}

export type Statistics = Record<Ratios, number | string>;