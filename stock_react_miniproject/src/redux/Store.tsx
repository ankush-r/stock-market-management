import { configureStore } from "@reduxjs/toolkit";

import summaryReducer from "./SummarySlice";
import stocksReducer from "./StockSlice";
import portfolioReducer from "./PortfolioSlice";

export const store = configureStore({
  reducer: {
    stocks: stocksReducer,
    summaryOfStocks: summaryReducer,
    portfolio: portfolioReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
