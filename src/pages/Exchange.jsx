import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from 'chart.js';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

const countryCurrencies = {
  Kenya: 'KES',
  Nigeria: 'NGN',
  Ghana: 'GHS',
  Tanzania: 'TZS'
};

const CurrencySelector = ({ label, value, onChange, options, disabledOption }) => (
  <div className="flex flex-col w-full">
    <label className="text-sm font-semibold text-gray-700 mb-1">{label}</label>
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="p-2 border rounded-md"
    >
      {options.map((country) => (
        <option
          key={country}
          value={country}
          disabled={country === disabledOption}
        >
          {country}
        </option>
      ))}
    </select>
  </div>
);

const convertCurrency = (amount, rate) => {
  return parseFloat((amount * rate).toFixed(2));
};

const ExchangeHistoryChart = ({ data }) => {
  const chartData = {
    labels: data.map((d) => d.date),
    datasets: [{
      label: "Exchange Rate",
      data: data.map((d) => d.rate),
      borderColor: '#5B2C6F',
      tension: 0.2,
    }]
  };

  return <Line data={chartData} />;
};

export default function ExchangePage() {
  const [fromCountry, setFromCountry] = useState("Kenya");
  const [toCountry, setToCountry] = useState("Nigeria");
  const [amount, setAmount] = useState('');
  const [converted, setConverted] = useState(null);
  const [rate, setRate] = useState(null);
  const [history, setHistory] = useState([]);

  const fromCurrency = countryCurrencies[fromCountry];
  const toCurrency = countryCurrencies[toCountry];

  useEffect(() => {
    if (!fromCurrency || !toCurrency || fromCurrency === toCurrency) return;

    const fetchRate = async () => {
      try {
        const response = await axios.get(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`);
        const newRate = response.data.rates[toCurrency];
        setRate(newRate);

        // Generate dummy 7-day data
        const hist = Array.from({ length: 7 }, (_, i) => ({
          date: `Day ${i + 1}`,
          rate: parseFloat((newRate + (Math.random() - 0.5) * 0.1).toFixed(2))
        }));
        setHistory(hist);

      } catch (error) {
        console.error("Error fetching exchange rate", error);
      }
    };

    fetchRate();
  }, [fromCurrency, toCurrency]);

  useEffect(() => {
    if (amount && rate) {
      setConverted(convertCurrency(amount, rate));
    } else {
      setConverted(null);
    }
  }, [amount, rate]);

  const handleSwap = () => {
    setFromCountry(toCountry);
    setToCountry(fromCountry);
    setAmount('');
    setConverted(null);
  };

  return (
    <div className="p-4 max-w-3xl mx-auto space-y-6">
      <h2 className="text-2xl font-bold text-center text-[#2C3E50]">Currency Exchange</h2>

      <div className="bg-white p-4 rounded-lg shadow-md space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          <CurrencySelector
            label="From Country"
            value={fromCountry}
            onChange={setFromCountry}
            options={Object.keys(countryCurrencies)}
            disabledOption={toCountry}
          />
          <CurrencySelector
            label="To Country"
            value={toCountry}
            onChange={setToCountry}
            options={Object.keys(countryCurrencies)}
            disabledOption={fromCountry}
          />
        </div>

        <div className="flex justify-center">
          <button
            onClick={handleSwap}
            className="mt-2 bg-[#5B2C6F] text-white px-4 py-2 rounded hover:bg-[#6e3a93]"
          >
            Swap
          </button>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-4">
          <input
            type="number"
            min="0"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
            className="border p-2 rounded w-full md:w-1/2"
          />
          <div className="text-xl text-[#2C3E50] min-w-[120px]">
            {converted !== null ? `${converted} ${toCurrency}` : '--'}
          </div>
        </div>

        <p className="text-sm text-gray-500 text-center">
          Rate: 1 {fromCurrency} = {rate ? rate.toFixed(2) : '--'} {toCurrency}
        </p>
      </div>

      {history.length > 0 && (
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-[#2C3E50] mb-2">7-Day Exchange History</h3>
          <ExchangeHistoryChart data={history} />
        </div>
      )}
    </div>
  );
}
