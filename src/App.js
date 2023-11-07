import './App.css';
import AsyncSelect from 'react-select/async';
import axios from "axios";

function App() {
  const promiseOptions = async (inputValue) => {
    if (!inputValue) {
      return [];
    }
    console.log(inputValue);

    const response = await axios({
      method: 'get',
      url: `/v1/finance/search?q=${inputValue}`,
      withCredentials: false,
    headers: {"Access-Control-Allow-Origin": "*"}
    });
    const options = response.data.quotes.map(data => ({value: data.symbol, label: data.symbol}));
    return options
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
