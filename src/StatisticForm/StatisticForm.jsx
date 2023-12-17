import React from 'react';

import { Alert, Grid } from '@mui/material';
import AsyncSelect from 'react-select/async';
import { LoadingButton } from '@mui/lab';
import { useStatisticForm } from './useStatisticForm';

const StatisticForm = () => {
  const { ref, loading, download, promiseOptions, error } = useStatisticForm();

  return (
    <Grid container spacing={2} justifyContent='center' alignItems='center'>
      <Grid item xs={5}>
        <AsyncSelect
          isMulti
          cacheOptions
          defaultOptions
          loadOptions={promiseOptions}
          ref={ref}
          placeholder='Поиск по тикеру'
          noOptionsMessage={() => 'Начните вводить тикер...'}
        />
      </Grid>
      <Grid item xs={2}>
        <LoadingButton
          type='button'
          fullWidth
          variant='contained'
          onClick={download}
          loading={loading}
        >
          Скачать CSV
        </LoadingButton>
      </Grid>
      {error ? <Grid item xs={7}><Alert severity='error'>
        {error}
      </Alert></Grid> : null}
    </Grid>
  );
};

export default StatisticForm;