import React from "react";
import { ReactComponent as SwapBtn } from "../../../../asset/icons/swap.svg";

const CurrencyRow = ({
  currencyOptions,
  selectedFromCurrency,
  selectedToCurrency,
  onChangeFromCurrency,
  onChangeToCurrency,
  onChangeAmount,
  amountInFromCurrency,
}) => {
  return (
    <div>
      <input
        type="number"
        className="input"
        value={amountInFromCurrency}
        onChange={onChangeAmount}
      />
      <select value={selectedFromCurrency} onChange={onChangeFromCurrency}>
        {currencyOptions.map((option, i) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <SwapBtn />
      <select value={selectedToCurrency} onChange={onChangeToCurrency}>
        {currencyOptions.map((option, i) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CurrencyRow;
