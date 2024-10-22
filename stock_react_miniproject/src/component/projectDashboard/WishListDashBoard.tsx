import { useState } from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { createUseStyles } from "react-jss";
import { IStockAPI } from "../utils/Interfaces";
import { Link } from "react-router-dom";
import ListStockItem from "./ListStockItem";

const itemsPerPage = 7;

const useStyles = createUseStyles({
  wrapper_dashboard: {
    width: "98vw",
    display: "flex",
    justifyContent: "center",
    minHeight: "70vh",
  },
  dashBoardContainer: {
    display: "flex",
    flexDirection: "column",
    width: "70vw",
    minHeight: "70vh",
    border: "3px solid #5b6065",
    borderRadius: "50px",
    justifySelf: "center",
  },
  dashBoardContent: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    minHeight: "70vh",
    flexDirection: "column",
    alignItems: "center",

    "& ul": {
      width: "100%",
      paddingLeft: "0rem",
      margin: "1rem",

      "& li": {
        listStyle: "none",
        display: "flex",
        justifyContent: "space-between",
      },
    },
  },
  first_part_title_dashboard: {
    margin: "0.7rem",
  },
  second_part_title_dashboard: {
    display: "flex",

    "& div": {
      margin: "0.7rem",
    },
  },
  pagination_component: {
    padding: "0.5rem",
    width: "max-content",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  low_first_part_title_dashboard: {
    margin: "1rem",
    paddingLeft: "1.5rem",
  },
});

interface IDashboardProp {
  stocks: IStockAPI[];
}

export function WishListDashBoard(prop: Readonly<IDashboardProp>) {
  const classes = useStyles();
  const currentStocks = prop.stocks;
  const [currentPage, setCurrentPage] = useState(1);
  const totalItems = currentStocks.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handleChange = (event, page) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedStocks = currentStocks.slice(startIndex, endIndex);

  return (
    <div className={classes.wrapper_dashboard}>
      <div className={classes.dashBoardContainer}>
        <div className={classes.dashBoardContent}>
          <ul>
            <li style={{ borderBottom: "3px solid #5b6065" }}>
              <div className={classes.first_part_title_dashboard}>Company</div>
              <div className={classes.second_part_title_dashboard}>
                <div>Base Price</div>
                <div>WatchList</div>
              </div>
            </li>
            {displayedStocks.map((stock, index) => (
              <li
                style={{ borderBottom: "2px solid #cccdce", margin: "0 1rem" }}
                key={index}
              >
                <div className={classes.low_first_part_title_dashboard}>
                  <Link
                    to={`/market/${stock.stock_name}`}
                    style={{ textDecoration: "none", color: "#000000" }}
                  >
                    {stock.stock_symbol}
                  </Link>
                </div>
                <ListStockItem
                  basePrice={stock.base_price}
                  stockName={stock.stock_name}
                  status={stock.stock_status}
                ></ListStockItem>
              </li>
            ))}
          </ul>
          <div className={classes.pagination_component}>
            <Stack spacing={2}>
              <Pagination
                count={totalPages}
                page={currentPage}
                onChange={handleChange}
                sx={{
                  "& .MuiPaginationItem-page": {
                    color: "#1971c2",
                  },
                  "& .MuiPaginationItem-page.Mui-selected": {
                    outline: "2px solid #1971c2",
                    color: "#1971c2",
                    "&:hover": {
                      outline: "2px solid #1971c2",
                    },
                  },
                }}
              />
            </Stack>
          </div>
        </div>
      </div>
    </div>
  );
}
