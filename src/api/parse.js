const validateValue = (node, name) => {
  if (!node.innerText.includes(name)) {
    console.log(node.innerText, name)
    throw new Error('Формат данных изменился, данные не могут быть считаны. Пожалуйста, обратитесь к администратору.');
  }
};
export const parseStatistics = (data) => {
  try {
    const el = document.createElement('div');
    el.innerHTML = data;

    const [valuation, history, , dividends, , profit, effectiveness, income, balance] = el.querySelectorAll('[data-test="qsp-statistics"] table');

    const valuationCells = valuation.querySelectorAll('td');
    validateValue(valuationCells[4], 'P/E');
    const priceToEarnings = parseFloat(valuationCells[5].innerText);

    validateValue(valuationCells[8], 'PEG');
    const PEG = parseFloat(valuationCells[9].innerText);

    validateValue(valuationCells[10], 'Price/Sales');
    const priceToSales = parseFloat(valuationCells[11].innerText);

    validateValue(valuationCells[12], 'Price/Book');
    const priceToBook = parseFloat(valuationCells[13].innerText);

    const dividendCells = dividends.querySelectorAll('td');
    validateValue(dividendCells[6], 'Dividend Yield');
    const dividendYield = parseFloat(dividendCells[7].innerText);

    validateValue(dividendCells[10], 'Payout');
    const dividendPayout = parseFloat(dividendCells[11].innerText);

    const effectivenessCells = effectiveness.querySelectorAll('td');
    validateValue(effectivenessCells[0], 'Return on Assets');
    const ROA = parseFloat(effectivenessCells[1].innerText);

    validateValue(effectivenessCells[2], 'Return on Equity');
    const ROE = parseFloat(effectivenessCells[3].innerText);

    const profitCells = profit.querySelectorAll('td');
    validateValue(profitCells[0], 'Profit Margin');
    const profitMargin = parseFloat(profitCells[1].innerText);

    const incomeCells = income.querySelectorAll('td');
    validateValue(incomeCells[12], 'EPS');
    const EPS = parseFloat(incomeCells[13].innerText);

    const balanceCells = balance.querySelectorAll('td');
    validateValue(balanceCells[6], 'Debt/Equity');
    const depthToEquity = parseFloat(balanceCells[7].innerText);
    validateValue(balanceCells[8], 'Current Ratio');
    const currentRatio = parseFloat(balanceCells[9].innerText);

    const historyCells = history.querySelectorAll('td');
    validateValue(historyCells[0], 'Beta');
    const beta = parseFloat(historyCells[1].innerText);

    el.remove();

    return {
      priceToEarnings,
      PEG,
      priceToSales,
      priceToBook,
      dividendYield,
      dividendPayout,
      ROA,
      ROE,
      profitMargin,
      EPS,
      depthToEquity,
      currentRatio,
      beta,
    };
  } catch (e) {
    throw new Error('Формат данных изменился, данные не могут быть считаны. Пожалуйста, обратитесь к администратору.');
  }
};

