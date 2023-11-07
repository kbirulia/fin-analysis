import './App.css';
import AsyncSelect from 'react-select/async';

function App() {
  const promiseOptions = async (inputValue) => {
    if (!inputValue) {
      return [];
    }

    const response = await fetch('https://corsproxy.io/?' + encodeURIComponent(`https://query1.finance.yahoo.com/v1/finance/search?q=${inputValue}`),);
    const data = await response.json();
    console.log(data);

    return data.quotes.map(data => ({value: data.symbol, label: data.symbol}));
  }

  return (
      <AsyncSelect
          isMulti
          cacheOptions
          defaultOptions
          loadOptions={promiseOptions}
      />
  );
}

export default App;
