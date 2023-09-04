import Axios from "axios";

export const fetchCurrencies = async () => {
    const axios = require("axios");

    const options = {
      method: "GET",
      url: "https://currency-converter5.p.rapidapi.com/currency/list",
      headers: {
        "X-RapidAPI-Key": "1cb963c96dmsh273dd2c315b18f9p119696jsn6750e46d1124",
        "X-RapidAPI-Host": "currency-converter5.p.rapidapi.com",
      },
    };

    try {
      const response = await axios.request(options);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  export const convertCurrencies = async (from, to, amount) => {
    let response;
    const axios = require("axios");

    const options = {
      method: "GET",
      url: "https://currency-converter5.p.rapidapi.com/currency/convert",
      params: {
        format: "json",
        from: "AUD",
        to: "CAD",
        amount: "1",
      },
      headers: {
        "X-RapidAPI-Key": "1cb963c96dmsh273dd2c315b18f9p119696jsn6750e46d1124",
        "X-RapidAPI-Host": "currency-converter5.p.rapidapi.com",
      },
    };

    try {
      const response = await axios.request(options);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };