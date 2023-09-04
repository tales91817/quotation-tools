import React, { useEffect, useState } from "react";
import { ReactComponent as CloseBtn } from "../../../../asset/icons/close.svg";

import CurrencyRow from "./CurrencyRow";
import axios from "axios";

const CurrencyModalBox = ({ handleAddProduct, closeModal }) => {
  const [currencyOptions, setCurrencyOptions] = useState([]);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState();
  const [exchangeRate, setExchangeRate] = useState();
  const [amount, setAmount] = useState(null);
  const [amountInFromCurrency, setAmountInFromCurrency] = useState(null);

  //API URL
  const BASE_URL = "https://v6.exchangerate-api.com/v6/";
  const access_key = "173dd47d2515714e06cacb95";
  const url = `https://v6.exchangerate-api.com/v6/${access_key}/latest/${fromCurrency}`;

  useEffect(() => {
    axios
      .get(url)
      .then((res) => {
        console.log(res.data.conversion_rates);
        setCurrencyOptions([...Object.keys(res.data.conversion_rates)]);
        setExchangeRate(res.data.conversion_rates[toCurrency]);
      })
      .catch((err) => console.log("Error: ", err));
  }, [fromCurrency, toCurrency]);

  // useEffect(() => {
  //   if (fromCurrency !== null && toCurrency !== null) {
  //     axios
  //       .get(url)
  //       .then((res) => console.log(res))
  //       .catch((err) => console.log("Error: ", err));
  //   }
  // }, [fromCurrency, toCurrency]);

  const convertCurrency = () => {
    let totalAmount = Number((amountInFromCurrency * exchangeRate).toFixed(2));
    console.log(amountInFromCurrency, exchangeRate);
    setAmount(totalAmount);
  };

  return (
    <div id="myModal" className="modal">
      <div className="modal-content">
        <span className="close" onClick={closeModal}>
          <CloseBtn />
        </span>
        <h1>Title</h1>
        <CurrencyRow
          currencyOptions={currencyOptions}
          selectedFromCurrency={fromCurrency}
          selectedToCurrency={toCurrency}
          onChangeFromCurrency={(e) => setFromCurrency(e.target.value)}
          onChangeToCurrency={(e) => {
            setToCurrency(e.target.value);
          }}
          onChangeAmount={(e) => setAmountInFromCurrency(e.target.value)}
          amountInFromCurrency={amountInFromCurrency}
        />

        <p>
          {fromCurrency} : {amount} {toCurrency}
        </p>
        <button className="updateBtb" onClick={convertCurrency}>
          Transfer Currency
        </button>
        <button className="updateBtb">Clear</button>
      </div>
    </div>
  );
};

export default CurrencyModalBox;
