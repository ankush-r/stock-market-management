/* eslint-disable react-refresh/only-export-components */
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IStockAPI, IStockTransaction } from "../component/utils/Interfaces";
import { fetchAllStocksAPI } from "./FetchStocksFromAPI";

interface Stocks {
  stocksArray: IStockAPI[];
  wishlistStocks: IStockAPI[];
  status: string;
  errorMessage: string;
  stockSymbolMap: Record<string, IStockAPI>;
  personalTransactions: IStockTransaction[];
  currentPrice: number;
}

const initialState: Stocks = {
  stocksArray: [],
  wishlistStocks: [],
  status: "",
  errorMessage: "",
  stockSymbolMap: {},
  personalTransactions: [],
  currentPrice: 0,
};

const StockState = createSlice({
  name: "stocks",
  initialState,
  reducers: {
    updatePrice: (state, action: PayloadAction<string>) => {
      state.currentPrice = parseInt(action.payload);
    },
    addToWishList: (state, action: PayloadAction<string>) => {
      const current = state.stocksArray.find(
        (stock) => stock.stock_name === action.payload
      ) as IStockAPI;
      if (current.stock_status === "plus") {
        current.stock_status = "saved";
        state.wishlistStocks.push(current);
      } else {
        const indexToRemove = state.wishlistStocks.findIndex(
          (stock) => stock.stock_name === action.payload
        );
        if (indexToRemove !== -1) {
          state.wishlistStocks.splice(indexToRemove, 1);
        }
        current.stock_status = "plus";
      }
    },
    addTransaction: (state, action: PayloadAction<IStockTransaction>) => {
      state.personalTransactions.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllStocksAPI.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(fetchAllStocksAPI.fulfilled, (state, action) => {
      action.payload.forEach((stock: IStockAPI) => {
        const current = { ...stock, stock_status: "plus" };
        state.stockSymbolMap[current.stock_name] = current;
        state.stocksArray.push(current);
      });
      state.status = "success";
    });
    builder.addCase(fetchAllStocksAPI.rejected, (state, action) => {
      state.status = "error";
      state.errorMessage = action.payload as string;
    });
  },
});

export const { addToWishList, addTransaction, updatePrice } =
  StockState.actions;
export default StockState.reducer;
