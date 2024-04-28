import React, { ReactElement, useMemo } from 'react';

import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';

import { TickerStatistic } from '../../api/getStatistics';
import { ratioTitles } from '../../constants';
import { Ratios } from '../../types';

const CompareTable = ({ data }: { data: TickerStatistic[] }): ReactElement => {
  const rows = useMemo(() => {
    return Object.keys(Ratios)
      .map((ratio) => [
        ratioTitles[ratio as Ratios],
        ...data.map(({ statistics }) => statistics[ratio as Ratios]),
      ]);
  }, [data])
  return (<TableContainer component={Paper}>
    <Table sx={{ minWidth: 650 }} aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell key="ratio">Ratio</TableCell>
          {data.map(({ ticker }) => (<TableCell key={ticker}>{ticker}</TableCell>))}
        </TableRow>
      </TableHead>
      <TableBody>
        {rows.map((row) => (
          <TableRow
            key={row[0]}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          >
            {row.map((cell, index) => (
              <TableCell key={index} component={index ===0 ? "th" : undefined} scope="row">
                {cell}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>);
};

export default CompareTable;
