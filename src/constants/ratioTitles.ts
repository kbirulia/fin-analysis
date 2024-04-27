import { Ratios } from '../types';

export const ratioTitles: Record<Ratios, string> = {
  [Ratios.priceToEarnings]: 'Trailing P/E',
  [Ratios.EPS]: 'Diluted EPS',
  [Ratios.PEG]: 'PEG Ratio',
  [Ratios.priceToSales]: 'Price/Sales',
  [Ratios.priceToBook]: 'Price/Book',
  [Ratios.dividendYield]: 'Trailing Annual Dividend Yield',
  [Ratios.dividendPayout]: 'Payout Ratio',
  [Ratios.ROA]: 'Return on Assets',
  [Ratios.ROE]: 'Return on Equity',
  [Ratios.profitMargin]: 'Profit Margin',
  [Ratios.depthToEquity]: 'Total Debt/Equity',
  [Ratios.currentRatio]: 'Current Ratio',
  [Ratios.beta]: 'Beta',
};