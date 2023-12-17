import { useCallback, useRef, useState } from 'react';
import { createCSV } from '../createCSV';
import { downloadFile } from '../downloadFile';
import { getStatistics } from '../api/getStatistics';
import { parseStatistics } from '../api/parse';

export const useStatisticForm = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const ref = useRef();

  const promiseOptions = useCallback(async (inputValue) => {
    if (!inputValue) {
      return [];
    }

    const response = await fetch('https://corsproxy.io/?' + encodeURIComponent(`https://query1.finance.yahoo.com/v1/finance/search?q=${inputValue}`));
    const data = await response.json();
    return data.quotes.map(data => ({ value: data.symbol, label: data.symbol }));
  }, []);

  const download = useCallback(async () => {
    setLoading(true);
    setError(false);

    const options = ref.current.getValue();
    const results = [];

    try {
      for (const option of options) {
        const document = await getStatistics(option.value);
        const ratios = parseStatistics(document);

        results.push({
          ticker: option.value,
          ratios,
        });
      }

      const csv = createCSV(results);
      downloadFile(
        csv,
        `${options.map(({ value }) => value).join('-')}-${(new Date()).toISOString().split('T')[0]}.csv`,
      );
    } catch (e) {
      setError(e.message);
    }
    setLoading(false);

  }, [ref, setError, setLoading]);

  return { ref, loading, download, promiseOptions, error };
};