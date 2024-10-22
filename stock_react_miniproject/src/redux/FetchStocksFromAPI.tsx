import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchAllStocksAPI = createAsyncThunk(
  "fetchingAllStocks",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(
        "https://kdu-automation.s3.ap-south-1.amazonaws.com/mini-project-apis/stocks.json"
      );
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue("Error while fetching Stocks");
    }
  }
);
