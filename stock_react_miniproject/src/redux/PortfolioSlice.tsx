import { createSlice } from "@reduxjs/toolkit";
import { IStockTransaction } from "../component/utils/Interfaces";
import { fetchAllPortfolioFromAPI } from "./FetchAllPortfolioTransactionFromAPI";

interface IPortfolio {
  allPreviousTransaction: IStockTransaction[];
  status: string;
  errorMessage: string;
}

const initialState: IPortfolio = {
  allPreviousTransaction: [],
  status: "",
  errorMessage: "",
};

const PortfolioState = createSlice({
  name: "portfolio",
  initialState,
  reducers: {
    groupAndSortTransactions: (state) => {
      const groupedTransactionsMap = state.allPreviousTransaction.reduce(
        (map, transaction) => {
          if (transaction.timestamp) {
            const date = new Date(transaction.timestamp);
            const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1)
              .toString()
              .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;

            if (!map.has(formattedDate)) {
              map.set(formattedDate, []);
            }

            map.get(formattedDate).push(transaction);
          }

          return map;
        },
        new Map<string, IStockTransaction[]>()
      );

      state.allPreviousTransaction = Array.from(groupedTransactionsMap.values())
        .flat()
        .sort((a, b) => {
          const dateA = new Date(a.timestamp);
          const dateB = new Date(b.timestamp);
          return dateB.getTime() - dateA.getTime();
        });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllPortfolioFromAPI.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(fetchAllPortfolioFromAPI.fulfilled, (state, action) => {
      state.status = "success";
      state.allPreviousTransaction = action.payload;

      PortfolioState.caseReducers.groupAndSortTransactions(state);
    });
    builder.addCase(fetchAllPortfolioFromAPI.rejected, (state, action) => {
      state.status = "error";
      state.errorMessage = action.payload as string;
    });
  },
});


export const { groupAndSortTransactions } = PortfolioState.actions;

export default PortfolioState.reducer;
