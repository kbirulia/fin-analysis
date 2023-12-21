export enum TextScopes {
  'request' = 'request',

}

export const text = {
  [TextScopes.request]: {
    apiFail: 'Unknown request error, please try again later.',
    formatChanges: 'Source data format has changes.',
    tickerApiFailed: 'Ticker api has failed.',
    tickerInvalidResponse: 'Ticker api has invalid response.',
    statisticsApiFailed: 'Statistics api has failed.',
    statisticsInvalidFormat: 'Statistics api has invalid response.',
  },
};