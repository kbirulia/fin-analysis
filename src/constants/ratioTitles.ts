import { Ratios } from '../types';

export const ratioTitles: Record<Ratios, string> = {
  [Ratios.priceToEarnings]: 'Trailing P/E',
  [Ratios.EPS]: 'Diluted EPS (ttm)',
  [Ratios.PEG]: 'PEG Ratio (5 yr expected)',
  [Ratios.priceToSales]: 'Price/Sales (ttm)',
  [Ratios.priceToBook]: 'Price/Book (mrq)',
  [Ratios.dividendYield]: 'Trailing Annual Dividend Yield',
  [Ratios.dividendPayout]: 'Payout Ratio',
  [Ratios.ROA]: 'Return on Assets (ttm)',
  [Ratios.ROE]: 'Return on Equity (ttm)',
  [Ratios.profitMargin]: 'Profit Margin',
  [Ratios.depthToEquity]: 'Total Debt/Equity (mrq)',
  [Ratios.currentRatio]: 'Current Ratio (mrq)',
  [Ratios.beta]: 'Beta (5Y Monthly)',
};