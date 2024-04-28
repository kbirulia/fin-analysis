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
    el.innerHTML =  data.slice(data.indexOf('<main'), data.indexOf('</main>'));


    const tables = el.querySelectorAll('table');
    const valuation = tables[0];
    const dividends = tables[9];
    const effectiveness = tables[3];
    const profit = tables[2];
    const income = tables[4];
    const balance = tables[5];
    const history = tables[7];

    const priceToEarnings = valuation.querySelectorAll('tr')[3];
    const PEG = valuation.querySelectorAll('tr')[5];
    const priceToSales = valuation.querySelectorAll('tr')[6];
    const priceToBook = valuation.querySelectorAll('tr')[7];

    const dividendCells = dividends.querySelectorAll('td');
    const effectivenessCells = effectiveness.querySelectorAll('td');
    const profitCells = profit.querySelectorAll('td');
    const incomeCells = income.querySelectorAll('td');
    const balanceCells = balance.querySelectorAll('td');
    const historyCells = history.querySelectorAll('td');

    const statistics = {
      [Ratios.priceToEarnings]: extractRatio(
        priceToEarnings.querySelectorAll('td')[1], ratioTitles.priceToEarnings
      ),
      [Ratios.PEG]: extractRatio(
        PEG.querySelectorAll('td')[1], ratioTitles.PEG
      ),
      [Ratios.priceToSales]: extractRatio(
        priceToSales.querySelectorAll('td')[1], ratioTitles.priceToSales
      ),
      [Ratios.priceToBook]: extractRatio(
        priceToBook.querySelectorAll('td')[1], ratioTitles.priceToBook
      ),
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