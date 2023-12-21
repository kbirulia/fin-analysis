import React from 'react';

import { LoadingButton } from '@mui/lab';
import { Alert, Grid } from '@mui/material';

import useStatisticForm from './useStatisticForm';
import TickerSearch from '../TickerSearch';

const StatisticForm = () => {
  const { setTickers, loading, disabled, error, download } = useStatisticForm();

  return (
    <Grid container spacing={2} justifyContent='center' alignItems='center'>
      <Grid item xs={5}>
        <TickerSearch setTicker={setTickers} />
      </Grid>
      <Grid item xs={2}>
        <LoadingButton
          type='button'
          fullWidth
          variant='contained'
          onClick={download}
          loading={loading}
          disabled={disabled}
        >
          Upload CSV
        </LoadingButton>
      </Grid>
      {error ? <Grid item xs={7}><Alert severity='error'>
        {error}
      </Alert></Grid> : null}
    </Grid>
  );
};

export default StatisticForm;