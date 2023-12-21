import createRequest, { RequestReturnType } from './createRequest';
import { text, TextScopes } from '../constants';
import { TickerOption } from '../types';

export type TickersResponse = {
  quotes: { symbol: string }[]
}

export const fetchTickers = async (query: string): Promise<TickersResponse> => {
  const response = await fetch(
    'https://corsproxy.io/?' + encodeURIComponent(`https://query1.finance.yahoo.com/v1/finance/search?q=${query}`),
  );
  return response.json();
};

export default async (query: string): Promise<RequestReturnType<TickerOption[]>> => {
  const requestFn = createRequest(fetchTickers, text[TextScopes.request].tickerApiFailed);
  const { data, error } = await requestFn(query);

  if (error) {
    return { error };
  }

  try {
    return {
      data: (data as TickersResponse).quotes
        .map(({ symbol }) => ({ value: symbol, label: symbol })),
    };
  } catch (e) {
    return { error: text[TextScopes.request].tickerInvalidResponse };
  }
}