import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllPortfolioFromAPI } from "../../redux/FetchAllPortfolioTransactionFromAPI";
import { RootState } from "../../redux/Store";
import { IStockTransaction } from "../utils/Interfaces";
import { useStyles } from "./MyPortfolioStyles";

interface GroupedTransactions {
  [date: string]: IStockTransaction[];
}

const MyPortfolio: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const allTransactions = useSelector((state: RootState) => {
    const allPreviousTransaction = state.portfolio.allPreviousTransaction;
    const personalTransactions = state.stocks.personalTransactions;

    return [...personalTransactions, ...allPreviousTransaction];
  });

  useEffect(() => {
    dispatch(fetchAllPortfolioFromAPI());
  }, [dispatch]);

  const [textFilter, setTextFilter] = useState<string>("");
  const [startDateFilter, setStartDateFilter] = useState<string>("");
  const [endDateFilter, setEndDateFilter] = useState<string>("");
  const [passedFilter, setPassedFilter] = useState<boolean>(false);
  const [failedFilter, setFailedFilter] = useState<boolean>(false);
  const [selectedStocks, setSelectedStocks] = useState<string[]>([]);

  const clearAllFilters = () => {
    setTextFilter("");
    setStartDateFilter("");
    setEndDateFilter("");
    setPassedFilter(false);
    setFailedFilter(false);
    setSelectedStocks([]);
  };

  const groupTransactionsByDate = (transactions: IStockTransaction[]) => {
    const groupedTransactions: GroupedTransactions = {};
    transactions.forEach((transaction) => {
      const date = new Date(transaction.timestamp).toLocaleDateString("en-US", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
      if (!groupedTransactions[date]) {
        groupedTransactions[date] = [];
      }
      groupedTransactions[date].push(transaction);
    });
    return groupedTransactions;
  };

  const filteredTransactions = allTransactions
    .filter((transaction) => {
      return (
        transaction.stock_name
          .toLowerCase()
          .includes(textFilter.toLowerCase()) ||
        transaction.stock_symbol
          .toLowerCase()
          .includes(textFilter.toLowerCase())
      );
    })
    .filter((transaction) => {
      if (startDateFilter) {
        return new Date(transaction.timestamp) >= new Date(startDateFilter);
      }
      return true;
    })
    .filter((transaction) => {
      if (endDateFilter) {
        return new Date(transaction.timestamp) <= new Date(endDateFilter);
      }
      return true;
    })
    .filter((transaction) => {
      if (passedFilter && transaction.status !== "Passed") {
        return false;
      }
      if (failedFilter && transaction.status !== "Failed") {
        return false;
      }
      return true;
    });

  const handleStockFilterChange = (stockName: string) => {
    if (selectedStocks.includes(stockName)) {
      setSelectedStocks(selectedStocks.filter((stock) => stock !== stockName));
    } else {
      setSelectedStocks([...selectedStocks, stockName]);
    }
  };

  const groupedStocks = Array.from(
    new Set(allTransactions.map((transaction) => transaction.stock_name))
  );

  const groupedTransactions = groupTransactionsByDate(filteredTransactions);

  const status = useSelector((state: RootState) => state.portfolio.status);
  if (status != "success") {
    return <div className={classes.loader}></div>;
  }

  return (
    <div className={classes.main_port_container}>
      <div className={classes.filter_box_container}>
        <div className={classes.one_filter_container}>
          <span>Filters</span>
          <button className={classes.clear_button} onClick={clearAllFilters}>
            Clear All
          </button>
        </div>
        <div className={classes.two_filter_container}>
          <input
            type="text"
            placeholder="Search For a Stock"
            value={textFilter}
            onChange={(e) => setTextFilter(e.target.value)}
          />
        </div>
        <div className={classes.third_filter_container}>
          <input
            type="date"
            placeholder="Start Date"
            className={classes.dateBox}
            value={startDateFilter}
            onChange={(e) => setStartDateFilter(e.target.value)}
          />
          <input
            type="date"
            placeholder="End Date"
            className={classes.dateBox}
            value={endDateFilter}
            onChange={(e) => setEndDateFilter(e.target.value)}
          />
        </div>
        <div className={classes.four_filter_container}>
          <label style={{ marginBottom: "0.3rem" }}>
            <input
              type="checkbox"
              checked={passedFilter}
              onChange={() => setPassedFilter(!passedFilter)}
              style={{ marginRight: "1rem" }}
            />
            Passed
          </label>
          <label style={{ marginBottom: "0.3rem" }}>
            <input
              type="checkbox"
              checked={failedFilter}
              onChange={() => setFailedFilter(!failedFilter)}
              style={{ marginRight: "1rem" }}
            />
            Failed
          </label>
        </div>
        <div className={classes.five_filter_container}>
          {groupedStocks.map((stockName) => (
            <label key={stockName}>
              <input
                type="checkbox"
                checked={selectedStocks.includes(stockName)}
                onChange={() => handleStockFilterChange(stockName)}
              />
              {stockName}
            </label>
          ))}
        </div>
      </div>
      <div className={classes.results_showing_container}>
        {Object.entries(groupedTransactions).map(
          ([date, transactions], index) => (
            <div key={index}>
              <div className={classes.dateGroup}>{date}</div>
              <ul className={classes.list_transaction}>
                {transactions.map((transaction, idx) => (
                  <li
                    key={transaction.timestamp}
                    className={classes.current_transaction_container}
                    style={{
                      opacity:
                        selectedStocks.length > 0 &&
                        !selectedStocks.includes(transaction.stock_name)
                          ? 0.5
                          : 1,
                    }}
                  >
                    <div style={{ width: "25vw" }}>
                      {transaction.stock_name}
                    </div>
                    <div>{transaction.stock_symbol}</div>
                    <div>
                      {"\u20B9"}
                      {transaction.transaction_price}
                    </div>
                    <div>
                      {new Date(transaction.timestamp)
                        .toLocaleString("en-US", {
                          hour: "numeric",
                          minute: "2-digit",
                          hour12: true,
                          timeZone: "UTC",
                        })
                        .replace(",", "")}
                    </div>
                    <div>
                      {
                        <i
                          style={{
                            color:
                              transaction.status === "Passed"
                                ? "#6bb97a"
                                : "#e76d6d",
                          }}
                          className="fi fi-ss-circle-small"
                        ></i>
                      }
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default MyPortfolio;
