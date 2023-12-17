export const getStatistics = async (symbol) => {
  try {
    const response = await fetch('https://corsproxy.io/?' + encodeURIComponent(
      `https://finance.yahoo.com/quote/${symbol}/key-statistics?p=${symbol}`, {}),
    );
    return response.text();
  } catch (e) {
    throw new Error('Не удалось получить данные. Побробуте еще раз');
  }
};