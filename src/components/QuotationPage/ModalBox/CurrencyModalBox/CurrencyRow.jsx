import React from "react";
import { ReactComponent as SwapBtn } from "../../../../asset/icons/swap.svg";
import "./currency-row.scss";

const CurrencyRow = ({
  currencyOptions,
  selectedFromCurrency,
  selectedToCurrency,
  onChangeFromCurrency,
  onChangeToCurrency,
  onChangeAmount,
  amountInFromCurrency,
  handleSwapCurrency,
  handleClearAmount,
}) => {
  return (
    <div className="currency-input">
      <h1>Please Enter Amount</h1>
      <input
        type="number"
        className="input"
        value={amountInFromCurrency}
        onChange={onChangeAmount}
      />
      <div className="currencies-switch">
        <select
          value={selectedFromCurrency}
          onChange={onChangeFromCurrency}
          onClick={handleClearAmount}
        >
          {currencyOptions.map((option, i) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <SwapBtn onClick={handleSwapCurrency} />
        <select
          value={selectedToCurrency}
          onChange={onChangeToCurrency}
          onClick={handleClearAmount}
        >
          {currencyOptions.map((option, i) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default CurrencyRow;
