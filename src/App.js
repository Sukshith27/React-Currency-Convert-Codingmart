import React, { useEffect, useState } from 'react';
import './App.css';
import CurrencyRow from './CurrencyRow';
import axios from 'axios';

const API = axios.create({
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
});

const BASE_URL = "https://api.frankfurter.app/latest"

function App() {

  const [currencyOptions, setCurrencyOptions] = useState([])
  const [fromCurrency, setFromCurrency] = useState();
  const [toCurrency, setToCurrency] = useState();
  const [exchangeRate, setExchangeRate] = useState()
  const [amount, setAmount] = useState(1);
  const [amountInFromCurrency, setAmountInFromCurrency] = useState(true)

  let toAmount, fromAmount
  if (amountInFromCurrency) {
    fromAmount = amount
    toAmount = amount * exchangeRate
  } else {
    toAmount = amount
    fromAmount = amount / exchangeRate
  }

  useEffect(() => {
    async function fetchAPI() {
      try {
        const response = await API.get(BASE_URL)
        console.log('----', response.data)
        const firstCurrency = Object.keys(response.data.rates)[0]
        setCurrencyOptions([response.data.base, ...Object.keys(response.data.rates)])
        setFromCurrency(response.data.base)
        setToCurrency(firstCurrency)
        setExchangeRate(response.data.rates[firstCurrency])
      }
      catch (e) {
        console.log('ERROR', e)
      }
    }
    fetchAPI();
  }, [])

  useEffect(() => {
    async function updateAPI() {
      if (fromCurrency != null && toCurrency != null) {
        try {
          const response = await API.get(`${BASE_URL}?amount=${amount}&from=${fromCurrency}&to=${toCurrency} `)
          setExchangeRate(response.data.rates[toCurrency])
        }
        catch (e) {

        }
      }
    }
    updateAPI();
  }, [fromCurrency, toCurrency])

  function handleFromAmountChange(e) {
    setAmount(e.target.value)
    setAmountInFromCurrency(true)
  }

  function handleToAmountChange(e) {
    setAmount(e.target.value)
    setAmountInFromCurrency(false)
  }

  return (
    <div style={{ flexDirection: "row", display: "flex" }}>
      <CurrencyRow
        title="Input"
        currencyOptions={currencyOptions}
        selectedCurrency={fromCurrency}
        onChangeCurrency={e => setFromCurrency(e.target.value)}
        amount={fromAmount}
        onChangeAmount={handleFromAmountChange}
      />
      {/* <div className="equals">=</div> */}
      <div style={{padding: 8, alignSelf: "center"}}>Convert</div>
      <CurrencyRow
        title="Output"
        currencyOptions={currencyOptions}
        selectedCurrency={toCurrency}
        onChangeCurrency={e => setToCurrency(e.target.value)}
        amount={toAmount}
        onChangeAmount={handleToAmountChange}
      />
    </div>
  );
}

export default App;
