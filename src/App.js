import AsyncSelect from 'react-select/async';
import {useCallback, useRef, useState} from "react";
import {fetchStatistic} from "./fetchDom";
import {Box, Container, CssBaseline, Typography} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import {createCSV} from "./createCSV";
import {downloadFile} from "./downloadFile";

function App() {
    const [loading, setLoading] = useState(false)
  const ref = useRef();

  const promiseOptions = useCallback(async (inputValue) => {
    if (!inputValue) {
      return [];
    }

    const response = await fetch('https://corsproxy.io/?' + encodeURIComponent(`https://query1.finance.yahoo.com/v1/finance/search?q=${inputValue}`),);
    const data = await response.json();
    return data.quotes.map(data => ({value: data.symbol, label: data.symbol}));
  }, [])

  const download = useCallback(async () => {
      setLoading(true);

    const options = ref.current.getValue();
    const results = [];

    for (const option of options) {
    const ratios = await fetchStatistic(option.value);
      results.push({
          ticker: option.value,
          ratios
      });
    }
    const csv = createCSV(results);
      downloadFile(
          csv,
          `${options.map(({ value }) => value).join('-')}-${(new Date()).toISOString().split('T')[0]}.csv`
      );
      setLoading(false)

  }, [ref])

  return (
      <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
              sx={{
                  marginTop: 8,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
              }}
          >
              <Typography component="h1" variant="h5">
                  Выберите тикеры для экспорта
              </Typography>
              <Box sx={{ mt: 1, width: 1 }}>
                  <AsyncSelect
                      isMulti
                      cacheOptions
                      defaultOptions
                      loadOptions={promiseOptions}
                      ref={ref}
                      placeholder="Поиск по тикеру"
                      noOptionsMessage={() =>"Начните вводить тикер..."}
                  />
                  <LoadingButton
                      type="button"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 3, mb: 2 }}
                      onClick={download}
                      loading={loading}
                  >
                      Скачать CSV
                  </LoadingButton>
              </Box>
          </Box>
      </Container>
  );
}

export default App;
