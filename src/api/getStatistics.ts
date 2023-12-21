import createRequest, { RequestReturnType } from './createRequest';
import { parseStatistics } from './parseStatistics';
import { text, TextScopes } from '../constants';
import { Statistics, TickerOption } from '../types';

export const fetchStatistics = async (ticker: string): Promise<string> => {
  const response = await fetch('https://corsproxy.io/?' + encodeURIComponent(
    `https://finance.yahoo.com/quote/${ticker}/key-statistics?p=${ticker}`),
  );
  return response.text();
};

export const fetchAllStatistics = (tickers: TickerOption[]) =>
  Promise.all(tickers.map(({ value }) => fetchStatistics(value)));

export type TickerStatistic = {
  ticker: string,
  statistics: Statistics
}

export default async (tickers: TickerOption[]): Promise<RequestReturnType<TickerStatistic[]>> => {
  const requestFn = createRequest(fetchAllStatistics, text[TextScopes.request].statisticsApiFailed);
  const {
    data,
    error,
  } = await requestFn(tickers);
  if (error) {
    return { error };
  }

  try {
    return {
      data: (data as string[]).map((document, index) => ({
        ticker: tickers[index].value,
        statistics: parseStatistics(document),
      })),
    };
  } catch (e) {
    return { error: (e as Error).message };
  }
}