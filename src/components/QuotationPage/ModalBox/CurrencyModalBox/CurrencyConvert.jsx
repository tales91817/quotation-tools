import React from "react";

const CurrencyConvert = () => {
  const [fromCurrency, setFromCurrency] = useState();
  const [toCurrency, setToCurrency] = useState();
  const [amount, setAmount] = useState(0);
  const [calculatedRate, setCalculatedRate] = useState(0);
  const [currencies, setCurrencies] = useState([]);
  const [currenciesFormattedArray, setCurrenciesFormattedArray] = useState([]);
  const [switchMessage, setSwitchMessage] = useState(false);
  const [currencySwitchedTo, setCurrencySwitchedTo] = useState(null);
  const [currencySwitchedFrom, setCurrencySwitchedFrom] = useState(null);

  const calculateCurrency = async () => {
    if (fromCurrency && toCurrency && amount) {
      try {
        const calculatedSum = await convertCurrencies(
          fromCurrency,
          toCurrency,
          amount
        );
        console.log(calculatedSum);
        console.lof(calculatedSum.data);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return <div>CurrencyConvert</div>;
};

export default CurrencyConvert;
