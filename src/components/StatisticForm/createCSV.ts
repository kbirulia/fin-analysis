import Papa from 'papaparse';

import { ratioTitles } from '../../constants';
import { Ratios, Statistics } from '../../types';

export const createCSV = (data: { ticker: string, statistics: Statistics }[]): string => {
  const headers = ['Ratio', ...data.map(({ ticker }) => ticker)];
  const values = Object.keys(Ratios)
    .map((ratio) => [
      ratioTitles[ratio as Ratios],
      ...data.map(({ statistics }) => statistics[ratio as Ratios]),
    ]);
  return Papa.unparse([headers, ...values]);
};