import React from 'react';

import DownloadIcon from '@mui/icons-material/Download';
import { LoadingButton } from '@mui/lab';
import { Alert, Grid, IconButton } from '@mui/material';

import useStatisticForm from './useStatisticForm';
import CompareTable from '../CompareTable';
import TickerSearch from '../TickerSearch';

const StatisticForm = () => {
  const {
    download,
    setTickers,
    loading,
    disabled,
    error,
    search,
    data
  } = useStatisticForm();

  return (
    <Grid container spacing={2} justifyContent='center' alignItems='center'>
      <Grid item xs={5}>
        <TickerSearch setTicker={setTickers} />
      </Grid>
      <Grid item xs={2}>
        <LoadingButton
          type='button'
          variant='contained'
          onClick={search}
          loading={loading}
          disabled={disabled}
        >
          Search
        </LoadingButton>
        {!!data.length && <IconButton onClick={download}><DownloadIcon/></IconButton>}
      </Grid>
      {error ? <Grid item xs={7}><Alert severity='error'>
        {error}
      </Alert></Grid> : null}
      {!!data.length && <CompareTable data={data} />}
    </Grid>
  );
};

export default StatisticForm;