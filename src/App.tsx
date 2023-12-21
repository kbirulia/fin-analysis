import React from 'react';

import { Box, Container, CssBaseline } from '@mui/material';
import { QueryClient, QueryClientProvider } from 'react-query';

import StatisticForm from './components/StatisticForm';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <Container component='main' maxWidth='xl'><CssBaseline />
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

export default App;
