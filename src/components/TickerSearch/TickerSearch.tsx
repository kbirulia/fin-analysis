import React, { Dispatch, ReactElement, SetStateAction } from 'react';

import AsyncSelect from 'react-select/async';

import { useTickerSearch } from './useTickerSearch';
import { TickerOption } from '../../types';

const TickerSearch = ({ setTicker }: {
  setTicker: Dispatch<SetStateAction<TickerOption[]>>,
}): ReactElement => {
  const { loadOptions, noOptions } = useTickerSearch();

  return <AsyncSelect
    isMulti
    cacheOptions
    defaultOptions
    loadOptions={loadOptions}
    placeholder='Search by ticker...'
    noOptionsMessage={noOptions}
    onChange={(options) => setTicker(options as TickerOption[])}
  />;
};

export default TickerSearch;
