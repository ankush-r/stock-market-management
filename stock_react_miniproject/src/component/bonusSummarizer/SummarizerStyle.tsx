import { createUseStyles } from "react-jss";

export const useStyles = createUseStyles({
  loader: {
    border: "16px solid #f3f3f3",
    borderRadius: "50%",
    borderTop: "16px solid #3498db",
    width: "120px",
    height: "120px",
    animation: "$spin 2s linear infinite",
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
  "@keyframes spin": {
    "0%": { transform: "rotate(0deg)" },
    "100%": { transform: "rotate(360deg)" },
  },
  particular_item: {
    display: "flex",
    justifyContent: "space-between",
    margin: "1rem",
    padding: "1rem",
    color: "white",
    borderRadius: "20px",
    minHeight: "8vh",
    flexWrap: "wrap",
  },
  stock_name_container: {
    fontSize: "2rem",
    marginBottom: "0.4rem",
  },
  profit_margin_container: {
    fontSize: "1rem",
  },
  right_conatinar: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  bought_container: {
    fontSize: "1rem",
  },
  sold_container: {
    fontSize: "1rem",
  },
});
