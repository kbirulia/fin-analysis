import React, { ReactNode, useCallback, useState } from 'react';

import { Alert } from '@mui/material';
import { GroupBase } from 'react-select/dist/declarations/src/types';
import { AsyncProps } from 'react-select/dist/declarations/src/useAsync';

import getTickers from '../../api/getTickers';
import { TickerOption } from '../../types';

type TickerSelectProps = AsyncProps<TickerOption, true, GroupBase<TickerOption>>;

export const useTickerSearch = (): {
  noOptions: TickerSelectProps['noOptionsMessage'],
  loadOptions: TickerSelectProps['loadOptions']
} => {
  const [searchError, setSearchError] = useState('');

  const loadOptions = useCallback(async (inputValue: string) => {
    const query = inputValue.trim();
    if (!query) {
      return [];
    }
    const { data, error } = await getTickers(inputValue);
    if (error) {
      setSearchError(error);
      return [];
    }

    return data as TickerOption[];
  }, [setSearchError]);

  const noOptions = ({ inputValue }: { inputValue: string }): ReactNode => {
    if (searchError) {
      return <Alert severity='error'>{searchError}</Alert>;
    }

    return inputValue
      ? 'Such ticker is not found'
      : 'Type ticker...';
  };

  return { noOptions, loadOptions };
};