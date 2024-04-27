import { Dispatch, SetStateAction, useCallback, useState } from 'react';

import { createCSV } from './createCSV';
import { downloadFile } from './downloadFile';
import getStatistics, { TickerStatistic } from '../../api/getStatistics';
import { TickerOption } from '../../types';

const useStatisticForm = (): {
  loading: boolean,
  disabled: boolean,
  search: () => void,
  download: () => void,
  error: string,
  setTickers: Dispatch<SetStateAction<TickerOption[]>>
  data: TickerStatistic[],
} => {
  const [tickers, setTickers] = useState<TickerOption[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [formError, setFormError] = useState<string>('');
  const [statistics, setStatistics] = useState<TickerStatistic[]>([]);

  const search = useCallback(async () => {
    setLoading(true);
    setFormError('');

    const { data, error } = await getStatistics(tickers);

    if (error) {
      setFormError(error);
      setLoading(false);
      return;
    }

    setStatistics(data as TickerStatistic[]);

    setLoading(false);

  }, [tickers, setFormError, setLoading]);

  const download = useCallback(async () => {

    const csv = createCSV(statistics as TickerStatistic[]);
    downloadFile(
      csv,
      `${tickers.map(({ value }) => value).join('-')}-${(new Date()).toISOString().split('T')[0]}.csv`,
    );

  }, [statistics, tickers]);

  return { download, loading, search, error: formError, setTickers, disabled: tickers.length === 0, data: statistics };
};

export default useStatisticForm;