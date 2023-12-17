import React from 'react';
import { Box, Container, CssBaseline } from '@mui/material';
import StatisticForm from './StatisticForm/StatisticForm';
import { QueryClient, QueryClientProvider } from 'react-query'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
    <Container component='main' maxWidth='xl'>
      <CssBaseline />
      <Box
        sx={{
          width: 1,
          marginTop: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <StatisticForm />
      </Box>
    </Container>
    </QueryClientProvider>
  );
}

export default App;
