import { parseStatistic } from "./parse";


export const fetchStatistic = async (symbol) => {
    const response = await fetch('https://corsproxy.io/?' + encodeURIComponent(
        `https://finance.yahoo.com/quote/${symbol}/key-statistics?p=${symbol}`,{
        })
    );
    const document = await response.text();

    return parseStatistic(document);
}