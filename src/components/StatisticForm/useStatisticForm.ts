import { Dispatch, SetStateAction, useCallback, useState } from 'react';

import { createCSV } from './createCSV';
import { downloadFile } from './downloadFile';
import getStatistics, { TickerStatistic } from '../../api/getStatistics';
import { TickerOption } from '../../types';

const useStatisticForm = (): {
  loading: boolean,
  disabled: boolean,
  download: () => void,
  error: string,
  setTickers: Dispatch<SetStateAction<TickerOption[]>>
} => {
  const [tickers, setTickers] = useState<TickerOption[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [formError, setFormError] = useState<string>('');

  const download = useCallback(async () => {
    setLoading(true);
    setFormError('');

    const { data, error } = await getStatistics(tickers);

    if (error) {
      setFormError(error);
      setLoading(false);
      return;
    }

    const csv = createCSV(data as TickerStatistic[]);
    downloadFile(
      csv,
      `${tickers.map(({ value }) => value).join('-')}-${(new Date()).toISOString().split('T')[0]}.csv`,
    );

    setLoading(false);

  }, [tickers, setFormError, setLoading]);

  return { loading, download, error: formError, setTickers, disabled: tickers.length === 0 };
};

export default useStatisticForm;