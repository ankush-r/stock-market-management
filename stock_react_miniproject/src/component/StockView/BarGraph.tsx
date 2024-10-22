import { useDispatch } from "react-redux";
import { updatePrice } from "../../redux/StockSlice";

interface BarGraphProps {
  amount: number;
  currentPrice: number;
}

function BarGraph({ amount, currentPrice }: Readonly<BarGraphProps>) {
  let difference = (amount - currentPrice) / currentPrice;
  difference = difference * 100;
  const dispatch = useDispatch();
  dispatch(updatePrice(difference.toString()));
  return (
    <div
      style={{
        minWidth: "18.4px",
        maxWidth: "18.4px",
        height: `${amount}px`,
        backgroundColor: currentPrice < amount ? "#b2f2bb" : "#ffc9c9",
        border:
          currentPrice < amount ? "solid #2f9e44 1px" : "solid #e03131 1px",
      }}
    ></div>
  );
}

export default BarGraph;
