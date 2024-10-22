import { createUseStyles } from "react-jss";
export const useStyles = createUseStyles({
  selectContainer: {
    position: "relative",
    width: "20vw",
    fontSize: "1.3rem",
    zIndex: "2",
  },
  selectedOption: {
    cursor: "pointer",
    padding: "0.5rem",
    border: "1px solid #000000",
    height: "6vh",
    display: "flex",
    justifyContent: "center",
  },
  optionsList: {
    listStyle: "none",
    padding: 0,
    margin: 0,
    border: "1px solid #ccc",
    maxHeight: "150px",
    overflowY: "auto",
    "&::-webkit-scrollbar": {
      display: "none",
    },
    position: "absolute",
    top: "100%",
    left: 0,
    width: "100%",
    zIndex: "2",
    fontSize: "1rem",
    backgroundColor: "#ffffff",
    borderRadius: "20px",

    "& li": {
      display: "flex",
    },
  },
  logo_stock: {
    display: "flex",
    border: "1px solid #f4b969",
    color: "#f4b969",
    backgroundColor: "#ffec99",
    width: "3rem",
    height: "2rem",
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    marginRight: "1rem",
  },
  optionItem: {
    padding: "10px",
    cursor: "pointer",
    zIndex: "2",
    borderBottom: "1px solid #000000",
  },
  optionItemHover: {
    "&:hover": {
      backgroundColor: "#f0f0f0",
    },
  },
});
