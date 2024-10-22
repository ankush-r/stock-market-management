import { IStockSummary, Datum } from "../utils/Interfaces";

export type Result = {
  company: string;
  symbol: string;
  buyDate: string;
  sellDate: string;
  buyRate: number;
  sellRate: number;
  maxProfit: number;
};

onmessage = function (e: MessageEvent<IStockSummary[]>) {
  const stocks: IStockSummary[] = e.data;
  const results: Result[] = [];

  stocks.forEach((stock) => {
    const { company, symbol, data } = stock;
    const result = calculateBestTimeToBuyAndSell(company, symbol, data);

    results.push(result);
  });

  postMessage(results);
};

function calculateBestTimeToBuyAndSell(
  company: string,
  symbol: string,
  prices: Datum[]
): Result {
  let buyDate = "";
  let sellDate = "";
  let buyRate = 0;
  let sellRate = 0;
  let maxProfit = 0;
  let minPrice = prices[0].prices[0];

  for (const { date, prices: currentPrices } of prices) {
    for (const currentPrice of currentPrices) {
      if (currentPrice < minPrice) {
        minPrice = currentPrice;
        buyDate = date;
        buyRate = currentPrice;
      } else {
        const profit = currentPrice - minPrice;
        if (profit > maxProfit) {
          maxProfit = profit;
          sellDate = date;
          sellRate = currentPrice;
        }
      }
    }
  }

  return { company, symbol, buyDate, sellDate, buyRate, sellRate, maxProfit };
}
