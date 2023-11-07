import Papa from 'papaparse';

const ratioMap = {
    priceToEarnings: 'Цена к прибыли (P/E)',
    EPS: 'Прибыль на акцию (EPS)',
    PEG: 'PEG-коэффициент',
    priceToSales: 'Цена к выручке (P/S)',
    priceToBook: 'Цена к балансовой стоимости (P/B)',
    dividendYield: 'Дивидендная доходность (Dividend Yield)',
    dividendPayout: 'Дивидендные выплаты (Dividend Payout)',
    ROA: 'Доходность активов (Return On Assets)',
    ROE: 'Доходность собственного капитала (Return On Equity)',
    profitMargin: 'Прибыльная маржа (Profit Margin)',
    depthToEquity: 'Долг к собственному капиталу (Debt To Equity) ',
    currentRatio: 'Текущая ликвидность (Current Ratio)',
    beta: 'Бета-коэффициент (Beta)'
}

export const createCSV = (data) => {
    const headers = ['Коэффициент', ...data.map(({ ticker }) => ticker)]
    const values = Object.keys(ratioMap).map(ratio => [ratioMap[ratio], ...data.map(({ ratios }) => ratios[ratio])]);
    return Papa.unparse([headers, ...values])
}