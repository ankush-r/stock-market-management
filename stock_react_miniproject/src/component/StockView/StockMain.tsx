import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { RootState } from "../../redux/Store";
import { IStockTransaction } from "../utils/Interfaces";
import BarGraph from "./BarGraph";
import { useEffect, useRef, useState } from "react";
import Dropdown from "./Dropdown";
import { addTransaction } from "../../redux/StockSlice";
import CustomizedSnackbars from "../SnackBar/SnackBarCustom";
import { io } from "socket.io-client";
import { useStyles } from "./StockMainStyle";

interface ParticularTransaction {
  company: string;
  amount: number;
  action: string;
  timeStamp: string;
}

export function StockMain() {
  const { stockName } = useParams();
  const allStocks = useSelector((state: RootState) => state.stocks.stocksArray);
  const currentStock = allStocks.find(
    (stock) => stock.stock_name === stockName
  );
  const dispatch = useDispatch();

  const [currentSocket, setCurrentSocket] = useState(null);
  const [news, setNews] = useState<string[]>([]);

  useEffect(() => {
    const socket = io("http://localhost:7000");
    socket.emit("join", stockName);
    setCurrentSocket(socket);

    socket.on("send", (message) => {
      setNews((prevData) => [message, ...prevData]);
    });

    return () => {
      socket.disconnect();
    };
  }, [stockName, dispatch]);

  const [prices, setPrices] = useState<number[]>([]);

  const [quantity, setQuantity] = useState<string>("");
  const [historyTransactions, setHistoryTransactions] = useState<
    ParticularTransaction[]
  >([]);
  const [stockShares, setStockShares] = useState<Map<string, number>>(
    new Map()
  );
  const [currentBalance, setCurrentBalance] = useState<number>(10000);
  const [pressed, setPressed] = useState<string>("");
  const curPer = useSelector((state: RootState) => state.stocks.currentPrice);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarStatus, setSnackbarStatus] = useState("success");

  const classes = useStyles();

  const [barData, setBarData] = useState<number[]>([]);

  const stockChangeContainerRef = useRef<HTMLDivElement | null>(null);

  const handleBuy = () => {
    if (!quantity) {
      alert("Please enter a quantity.");
      return;
    }

    const qty = parseInt(quantity, 10);
    if (isNaN(qty) ?? qty <= 0) {
      alert("Please enter a valid quantity.");
      return;
    }

    const total = qty * (prices[prices.length - 1] ?? 0);

    if (total <= currentBalance) {
      const transaction: IStockTransaction = {
        stock_name: currentStock?.stock_name ?? "",
        stock_symbol: currentStock?.stock_symbol ?? "",
        transaction_price: prices[prices.length - 1] ?? 0,
        timestamp: new Date().toISOString(),
        status: "Passed",
      };
      const tempTransaction: ParticularTransaction = {
        company: currentStock?.stock_name ?? "",
        amount: qty,
        timeStamp: new Date().toISOString(),
        action: "BUY",
      };

      setPressed("BUY");
      setCurrentBalance(currentBalance - total);
      setHistoryTransactions([...historyTransactions, tempTransaction]);
      dispatch(addTransaction(transaction));

      const currentShares =
        stockShares.get(currentStock?.stock_name ?? "") ?? 0;
      setStockShares(
        new Map(
          stockShares.set(currentStock?.stock_name ?? "", currentShares + qty)
        )
      );

      setSnackbarMessage(
        `Success: Bought ${qty} shares at ${"\u20B9"}${
          prices[prices.length - 1]
        } each.`
      );
      setSnackbarStatus("success");
      setSnackbarOpen(true);
      currentSocket.emit("done", `bought ${qty} ${stockName}`, stockName);
    } else {
      const transaction: IStockTransaction = {
        stock_name: currentStock?.stock_name ?? "",
        stock_symbol: currentStock?.stock_symbol ?? "",
        transaction_price: prices[prices.length - 1] ?? 0,
        timestamp: new Date().toISOString(),
        status: "Failed",
      };
      dispatch(addTransaction(transaction));
      setSnackbarMessage("Insufficient funds.");
      setSnackbarStatus("error");
      setSnackbarOpen(true);
    }
  };

  const handleSell = () => {
    if (!quantity) {
      alert("Please enter a quantity.");
      return;
    }

    const qty = parseInt(quantity, 10);
    if (isNaN(qty) ?? qty <= 0) {
      alert("Please enter a valid quantity.");
      return;
    }

    const currentShares = stockShares.get(currentStock?.stock_name ?? "") ?? 0;
    if (qty <= currentShares) {
      const transaction: IStockTransaction = {
        stock_name: currentStock?.stock_name ?? "",
        stock_symbol: currentStock?.stock_symbol ?? "",
        transaction_price: prices[prices.length - 1] ?? 0,
        timestamp: new Date().toISOString(),
        status: "Passed",
      };
      const tempTransaction: ParticularTransaction = {
        company: currentStock?.stock_name ?? "",
        amount: qty,
        timeStamp: new Date().toISOString(),
        action: "SELL",
      };
      setPressed("SELL");

      setCurrentBalance(
        currentBalance + qty * (prices[prices.length - 1] ?? 0)
      );
      setHistoryTransactions([...historyTransactions, tempTransaction]);
      dispatch(addTransaction(transaction));
      setStockShares(
        new Map(
          stockShares.set(currentStock?.stock_name ?? "", currentShares - qty)
        )
      );

      setSnackbarMessage(
        `Success: Sold ${qty} shares at ${"\u20B9"}${
          prices[prices.length - 1]
        } each.`
      );
      setSnackbarStatus("success");
      setSnackbarOpen(true);
      currentSocket.emit("done", `sold ${qty} ${stockName}`, stockName);
    } else {
      const transaction: IStockTransaction = {
        stock_name: currentStock?.stock_name ?? "",
        stock_symbol: currentStock?.stock_symbol ?? "",
        transaction_price: prices[prices.length - 1] ?? 0,
        timestamp: new Date().toISOString(),
        status: "Failed",
      };
      dispatch(addTransaction(transaction));

      setSnackbarMessage("Insufficient shares to sell.");
      setSnackbarStatus("error");
      setSnackbarOpen(true);
    }
  };
  const handleDropdownSelect = () => {
    setHistoryTransactions([]);
    setBarData([]);
  };
  useEffect(() => {
    const intervalId = setInterval(() => {
      const newData = Math.floor(Math.random() * 500);
      setPrices((prevPrices) => [...prevPrices, newData]);

      setBarData((prevData) => [...prevData, newData]);

      if (stockChangeContainerRef.current) {
        stockChangeContainerRef.current.scrollLeft =
          stockChangeContainerRef.current.scrollWidth;
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [dispatch]);

  return (
    <div className={classes.whole_container}>
      <div className={classes.left_stock_container}>
        <div className={classes.top_action_container}>
          <Dropdown
            options={allStocks}
            onSelect={handleDropdownSelect}
            selectedValue={currentStock?.stock_name}
            selectedSymbol={currentStock?.stock_symbol}
          />

          <div className={classes.price_percentage_container}>
            Price
            <span
              className={classes.currentPrice}
              style={{ color: curPer > 0 ? "#34a148" : "#e54b4b" }}
            >
              {prices[prices.length - 1]}
            </span>
            <span className="arrowOfChange">
              {curPer > 0 ? (
                <i
                  style={{ color: "#34a148" }}
                  className="fi fi-br-arrow-up"
                ></i>
              ) : (
                <i
                  style={{ color: "#e54b4b" }}
                  className="fi fi-br-arrow-down"
                ></i>
              )}
            </span>
            <span className={classes.percentageChange}>
              {curPer.toFixed(2)}%
            </span>
          </div>
          <div className={classes.buy_sell_container}>
            <input
              type="text"
              className={classes.input_field}
              placeholder="Enter QTY"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
            <button className={classes.buy_button} onClick={handleBuy}>
              BUY
            </button>
            <button className={classes.sell_button} onClick={handleSell}>
              SELL
            </button>
          </div>
        </div>
        <div
          ref={stockChangeContainerRef}
          className={classes.stock_change_container}
        >
          {barData.map((amount, index) => (
            <BarGraph
              key={index}
              amount={amount}
              currentPrice={prices[index - 1] ?? 0}
            />
          ))}
        </div>
      </div>
      <div className={classes.right_stock_container}>
        <div className={classes.history_container}>
          <span style={{ fontSize: "1.5rem", backgroundColor: "#ffffff" }}>
            History:
          </span>
          <ul>
            {historyTransactions.map((transaction) => (
              <li key={transaction.timeStamp}>
                <div>
                  <div className={classes.list_up_side}>
                    {transaction.amount} stocks
                  </div>
                  <div className={classes.list_down_side}>
                    {transaction.timeStamp}
                  </div>
                </div>
                <div
                  className={classes.list_right_side}
                  style={{
                    color: transaction.action == "BUY" ? "#34a148" : "#e54b4b",
                  }}
                >
                  {transaction.action}
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className={classes.news_others_container}>
          <ul style={{ paddingLeft: "0" }}>
            {news.map((demo, index) => (
              <li className={classes.news_item} key={index}>
                {demo}
              </li>
            ))}
          </ul>
        </div>
      </div>
      {snackbarOpen && (
        <CustomizedSnackbars
          message={snackbarMessage}
          status={snackbarStatus}
          onClose={() => setSnackbarOpen(false)}
        />
      )}
    </div>
  );
}
