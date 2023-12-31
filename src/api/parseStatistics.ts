import { ratioTitles, text, TextScopes } from '../constants';
import { Ratios, Statistics } from '../types';

const extractRatio = (node: HTMLElement, name: string): number | string => {
  if (!(node.previousElementSibling as HTMLElement).innerText.includes(name)) {
    throw new Error();
  }
  const value = parseFloat(node.innerText);
  return isNaN(value) ? node.innerText : value;
};
export const parseStatistics = (data: string): Statistics => {
  try {
    const el = document.createElement('div');
    el.innerHTML = data;

    const [valuation, history, , dividends, , profit, effectiveness, income, balance] = el.querySelectorAll('[data-test="qsp-statistics"] table');

    const valuationCells = valuation.querySelectorAll('td');
    const dividendCells = dividends.querySelectorAll('td');
    const effectivenessCells = effectiveness.querySelectorAll('td');
    const profitCells = profit.querySelectorAll('td');
    const incomeCells = income.querySelectorAll('td');
    const balanceCells = balance.querySelectorAll('td');
    const historyCells = history.querySelectorAll('td');

    const statistics = {
      [Ratios.priceToEarnings]: extractRatio(valuationCells[5], ratioTitles.priceToEarnings),
      [Ratios.PEG]: extractRatio(valuationCells[9], ratioTitles.PEG),
      [Ratios.priceToSales]: extractRatio(valuationCells[11], ratioTitles.priceToSales),
      [Ratios.priceToBook]: extractRatio(valuationCells[13], ratioTitles.priceToBook),
      [Ratios.dividendYield]: extractRatio(dividendCells[7], ratioTitles.dividendYield),
      [Ratios.dividendPayout]: extractRatio(dividendCells[11], ratioTitles.dividendPayout),
      [Ratios.ROA]: extractRatio(effectivenessCells[1], ratioTitles.ROA),
      [Ratios.ROE]: extractRatio(effectivenessCells[3], ratioTitles.ROE),
      [Ratios.profitMargin]: extractRatio(profitCells[1], ratioTitles.profitMargin),
      [Ratios.EPS]: extractRatio(incomeCells[13], ratioTitles.EPS),
      [Ratios.depthToEquity]: extractRatio(balanceCells[7], ratioTitles.depthToEquity),
      [Ratios.currentRatio]: extractRatio(balanceCells[9], ratioTitles.currentRatio),
      [Ratios.beta]: extractRatio(historyCells[1], ratioTitles.beta),
    };

    el.remove();

    return statistics;
  } catch (e) {
    throw new Error(text[TextScopes.request].statisticsInvalidFormat);
  }
};