import { createUseStyles } from "react-jss";
export const useStyles = createUseStyles({
  navigationContainer: {
    backgroundColor: "#1971c2",
    minHeight: "10vh",
    maxHeight: "10vh",
    width: "100%",
    display: "flex",
    justifyContent: "space-around",
    position: "sticky",
    top: "0",
  },
  leftNavigationContainer: {
    marginLeft: "1rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    "& > a": {
      textDecoration: "none",
      "& i": {
        fontSize: "3rem",
        color: "white",
        textDecoration: "none",
        "@media (max-width: 750px)": {
          fontSize: "1rem",
        },
      },
    },
    "& span": {
      color: "white",
      padding: "1rem",
      margin: "1rem",
      fontSize: "2.5rem",
      "@media (max-width: 750px)": {
        fontSize: "1rem",
      },
    },
  },
  rightNavigationContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    "& > a": {
      textDecoration: "none",
      "& span": {
        color: "white",
        padding: "1rem",
        margin: "1rem",
        marginTop: "2rem",
        fontSize: "2.5rem",
        textDecoration: "none",

        "@media (max-width: 750px)": {
          fontSize: "1rem",
          margin: "2rem",
        },
      },
    },
    "@media (max-width: 750px)": {
      display: "none",
      flexDirection: "column",
    },
  },
  hamburgerIcon: {
    display: "none",

    "@media (max-width: 750px)": {
      display: "inline",
      marginTop: "2rem",
    },
  },
  menuItemsContainer: {
    display: "none",

    "@media (max-width: 750px)": {
      display: "inline",
      marginTop: "2rem",
      direction: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      position: "absolute",
      top: "60%",
      right: 0,
      backgroundColor: "#1971c2",
      boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
      padding: "1rem",
      zIndex: 1,
    },
  },

  menuItem: {
    margin: "0.5rem 0",
    textDecoration: "none",
    color: "#fff",
    display: "block",
  },
});
