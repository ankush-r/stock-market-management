import { createUseStyles } from "react-jss";
export const useStyles = createUseStyles({
  main_port_container: {
    display: "flex",
    width: "90vw",
    height: "80vh",
    marginLeft: "5rem",
    flexWrap: "wrap",
    marginTop: "1rem",
    "@media (max-width: 750px)": {
      margin: "1rem",
    },
  },
  filter_box_container: {
    margin: "0.5rem",
    minWidth: "22vw",
    maxWidth: "auto",
    alignSelf: "center",
    height: "50vh",
    display: "flex",
    flex: "1",
    flexDirection: "column",
    border: "2px solid #000",
    borderRadius: "15px",
    backgroundColor: "#e9ecef",

    "@media (max-width: 750px)": {
      margin: "0rem",
    },
  },
  results_showing_container: {
    margin: "0.5rem",
    minWidth: "65vw",
    height: "75vh",
    overflowY: "auto",
    "&::-webkit-scrollbar": {
      display: "none",
    },
  },
  dateGroup: {
    marginBottom: "0.5rem",
    marginTop: "2rem",
    fontSize: "1rem",
    fontWeight: "bold",
    borderBottom: "2px dotted #a5a6a7",
    padding: "1rem",
    color: "#a5a6a7",
  },
  list_transaction: {
    paddingLeft: "0",

    "& li": {
      listStyle: "none",
    },
  },
  current_transaction_container: {
    display: "flex",
    borderBottom: "1px solid #000",
    margin: "1rem",
    padding: "1rem",
    justifyContent: "space-between",
    "@media (max-width: 750px)": {
      gap: "1rem",
      flexWrap: "wrap",
    },
  },
  one_filter_container: {
    display: "flex",
    justifyContent: "space-between",
    padding: "1rem",
    borderBottom: "2px solid #6f7072",
    fontSize: "1.5rem",
    fontWeight: "500",
  },
  two_filter_container: {
    display: "flex",
    justifyContent: "center",
    marginTop: "0.5rem",
    padding: "0.7rem",
    borderBottom: "2px solid #6f7072",

    "& input": {
      height: "3.5vh",
      width: "20vw",
      borderRadius: "10px",
      border: "2px solid #6f7072",
      fontSize: "1rem",
      display: "flex",
      flex: "1",
    },
  },
  third_filter_container: {
    display: "flex",
    justifyContent: "space-between",
    borderBottom: "2px solid #6f7072",
  },
  dateBox: {
    margin: "1rem",
    padding: "0.2rem",
    width: "8vw",
    height: "4vh",
    borderRadius: "10px",
    border: "2px solid #6f7072",
    display: "flex",
    flex: "1",
  },
  four_filter_container: {
    display: "flex",
    flexDirection: "column",
    padding: "1rem",
    borderBottom: "2px solid #6f7072",
  },
  clear_button: {
    border: "none",
    color: "#1971c2",
    fontSize: "1rem",
    fontWeight: "600",
  },
  five_filter_container: {
    display: "flex",
    flexDirection: "column",
    overflowY: "auto",
    "&::-webkit-scrollbar": {
      display: "none",
    },
    padding: "1rem",
  },
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
});
