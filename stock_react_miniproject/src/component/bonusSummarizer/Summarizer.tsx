import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllSummaryStocks } from "../../redux/FetchSummaryOfStocksFromAPI";
import { RootState } from "../../redux/Store";
import { Result } from "./StockWorker";
import { useStyles } from "./SummarizerStyle";

export default function Summarizer() {
  const dispatch = useDispatch();
  const summaryStocks = useSelector(
    (state: RootState) => state.summaryOfStocks.stocksSummary
  );
  const [loading, setLoading] = useState(true);
  const [results, setResults] = useState<Result[]>([]);
  const classes = useStyles();

  const workerRef = useRef<Worker | null>(null);

  useEffect(() => {
    dispatch(fetchAllSummaryStocks());
  }, [dispatch]);

  useEffect(() => {
    const calculateStocks = async () => {
      try {
        workerRef.current = new Worker(
          new URL("./StockWorker.ts", import.meta.url)
        );

        workerRef.current.postMessage(summaryStocks);

        workerRef.current.onmessage = (event) => {
          const calculatedResults = event.data;
          setResults(calculatedResults);
          setLoading(false);
        };

        workerRef.current.onerror = (error) => {
          setLoading(false);
        };
      } catch (error) {
        setLoading(false);
      }
    };

    if (summaryStocks.length > 0 && loading) {
      calculateStocks();
    }

    return () => {
      if (workerRef.current) {
        workerRef.current.terminate();
      }
    };
  }, [summaryStocks, loading]);

  function formatDate(dateString: string | number | Date) {
    const options = { day: "numeric", month: "short", year: "numeric" };
    return new Date(dateString)
      .toLocaleDateString("en-GB", options)
      .replace(/ /g, "-");
  }

  return (
    <div>
      {loading && <div className={classes.loader}></div>}

      {results.map((result, index) => (
        <div
          className={classes.particular_item}
          style={{
            backgroundColor: result.maxProfit >= 0 ? "#1971c2" : "#e24545",
          }}
          key={index}
        >
          <div className="left_container">
            <div className={classes.stock_name_container}>{result.company}</div>
            <div className="profit_margin_container">
              Profit Margin : {"\u20B9"}
              {result.maxProfit}
            </div>
          </div>
          <div className={classes.right_conatinar}>
            <div className={classes.bought_container}>
              Buy: {"\u20B9"}
              {result.buyRate} on {formatDate(result.buyDate)}
            </div>
            <div className={classes.sold_container}>
              Sell: {"\u20B9"}
              {result.sellRate} on {formatDate(result.sellDate)}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
