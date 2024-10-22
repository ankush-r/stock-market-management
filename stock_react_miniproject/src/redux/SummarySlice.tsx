import { createSlice } from "@reduxjs/toolkit";
import { IStockSummary } from "../component/utils/Interfaces";
import { fetchAllSummaryStocks } from "./FetchSummaryOfStocksFromAPI";

interface ISummary {
  stocksSummary: IStockSummary[];
  status: string;
  errorMessage: string;
}

const initialState: ISummary = {
  stocksSummary: [],
  status: "",
  errorMessage: "",
};

const SummaryState = createSlice({
  name: "summaryOfStocks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllSummaryStocks.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(fetchAllSummaryStocks.fulfilled, (state, action) => {
      state.status = "success";
      state.stocksSummary = action.payload;
    });
    builder.addCase(fetchAllSummaryStocks.rejected, (state, action) => {
      state.status = "error";
      state.errorMessage = action.payload as string;
    });
  },
});

export default SummaryState.reducer;
