import { useState } from "react";
import { createUseStyles } from "react-jss";
import { AllStocksDashBoard } from "./AllStocksDashBoard";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/Store";
import { WishListDashBoard } from "./WishListDashBoard";

const useStyles = createUseStyles({
  titleDashBoard: {
    padding: "1rem",
    margin: "1rem",
    minHeight: "3vh",
  },
});

export default function Dashboard() {
  const classes = useStyles();
  const [selectedView, setSelectedView] = useState("explore");
  const stocks = useSelector((state: RootState) => state.stocks.stocksArray);
  const wish = useSelector((state: RootState) => state.stocks.wishlistStocks);

  return (
    <>
      <div className={classes.titleDashBoard}>
        {" "}
        <span
          style={{
            cursor: "pointer",
            borderBottom:
              selectedView === "explore" ? "3px solid #1971c2" : "none",
          }}
          onClick={() => setSelectedView("explore")}
        >
          Explore
        </span>
        <span
          style={{
            cursor: "pointer",
            marginLeft: "1rem",
            borderBottom:
              selectedView === "wishlist" ? "3px solid #1971c2" : "none",
          }}
          onClick={() => setSelectedView("wishlist")}
        >
          My WatchList
        </span>
      </div>
      {selectedView === "explore" ? (
        <AllStocksDashBoard stocks={stocks} />
      ) : (
        <WishListDashBoard stocks={wish} />
      )}
    </>
  );
}
