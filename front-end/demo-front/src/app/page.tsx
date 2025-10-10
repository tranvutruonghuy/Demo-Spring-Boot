"use client";

import { DataType, UserTable } from "./components/UserTable";
import { ThemeToggleButton } from "./components/ThemeToggleButton";
import { useTheme } from "../contexts/ThemeContext";
import { DataService } from "@/services/DataService";
import { useEffect, useState } from "react";
import { ExchangeRate, ExchangeRates } from "@/models/exchangeRateModel";

export default function Home() {
  const { theme } = useTheme();
  const [exchangeRate, setExchangeRate] = useState<ExchangeRate>();
  const [exchangeRateData, setExchangeRateData] = useState<DataType[]>([]);

  const style = {
    backgroundColor: theme === "light" ? "#fff" : "#333",
    color: theme === "light" ? "#000" : "#fff",
    minHeight: "100vh",
    padding: "2rem",
  };

  useEffect(() => {
    const getExchangeRateData = async () => {
      const response = await DataService.getFootballData();
      setExchangeRate(response);
    };

    getExchangeRateData();
  }, []);

  // Chuyển đổi dữ liệu khi exchangeRate thay đổi
  useEffect(() => {
    if (exchangeRate?.rates) {
      const rates = exchangeRate.rates;
      const formattedData: DataType[] = Object.keys(rates).map(
        (currencyCode) => ({
          key: currencyCode,
          name: currencyCode,
          age: rates[currencyCode],
          address: `1 ${exchangeRate.base_code} = ${rates[currencyCode]} ${currencyCode}`,
          tags: [exchangeRate.base_code],
        })
      );
      setExchangeRateData(formattedData);
    }
  }, [exchangeRate]);

  return (
    <div style={style}>
      <ThemeToggleButton />
      <h1>Exchange Rates (Base: {exchangeRate?.base_code})</h1>
      <UserTable data={exchangeRateData} />
    </div>
  );
}
