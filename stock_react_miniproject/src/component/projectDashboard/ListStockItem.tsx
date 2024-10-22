import { useState } from "react";
import { createUseStyles } from "react-jss";
import { useDispatch } from "react-redux";
import { addToWishList } from "../../redux/StockSlice";

const useStyles = createUseStyles({
  button_last: {
    backgroundColor: "#ffffff",
    border: "none",
    fontSize: "1rem",
    marginRight: "0.6rem",
  },
  low_second_part_title_dashboard: {
    display: "flex",
    "& div": {
      margin: "1rem",
      marginRight: "2rem",
      paddingRight: "1.5rem",
    },
  },
});

interface ItemProp {
  basePrice: number;
  stockName: string;
  status: string | undefined;
}

export default function ListStockItem(prop: Readonly<ItemProp>) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [crossHover, setCrossHover] = useState<boolean>(false);

  const saveToWatchList = (symbol: string) => {
    dispatch(addToWishList(symbol));
  };

  return (
    <div className={classes.low_second_part_title_dashboard}>
      <div>
        {"\u20B9"}
        {prop.basePrice}
      </div>
      <button
        onClick={() => saveToWatchList(prop.stockName)}
        className={classes.button_last}
        onMouseEnter={() => setCrossHover(true)}
        onMouseLeave={() => setCrossHover(false)}
      >
        {prop.status == "plus" ? (
          <i className="fi fi-bs-add" style={{ color: "#1971c2" }}></i>
        ) : crossHover ? (
          <i className="fi fi-sr-cross-circle" style={{ color: "red" }}></i>
        ) : (
          <i className="fi fi-ss-check-circle" style={{ color: "#1971c2" }}></i>
        )}
      </button>
    </div>
  );
}
