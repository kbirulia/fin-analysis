
export const parseStatistic = (data) => {
    const el = document.createElement('div');
    el.innerHTML = data;

    const [valuation,history,,dividends,,profit,effectiveness,income ,balance] = el.querySelectorAll('[data-test="qsp-statistics"] table');
    const priceToEarnings = parseFloat(valuation.querySelectorAll('td')[5].innerText);
    const PEG = parseFloat(valuation.querySelectorAll('td')[9].innerText);
    const priceToSales = parseFloat(valuation.querySelectorAll('td')[11].innerText);
    const priceToBook = parseFloat(valuation.querySelectorAll('td')[13].innerText);
    const dividendYield = parseFloat(dividends.querySelectorAll('td')[7].innerText);
    const dividendPayout = parseFloat(dividends.querySelectorAll('td')[11].innerText);
    const ROA = parseFloat(effectiveness.querySelectorAll('td')[1].innerText);
    const ROE = parseFloat(effectiveness.querySelectorAll('td')[3].innerText);
    const profitMargin = parseFloat(profit.querySelectorAll('td')[1].innerText);
    const EPS = parseFloat(income.querySelectorAll('td')[13].innerText);
    const depthToEquity = parseFloat(balance.querySelectorAll('td')[7].innerText);
    const currentRatio = parseFloat(balance.querySelectorAll('td')[9].innerText);
    const beta = parseFloat(history.querySelectorAll('td')[1].innerText);

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
        beta
    }
}

