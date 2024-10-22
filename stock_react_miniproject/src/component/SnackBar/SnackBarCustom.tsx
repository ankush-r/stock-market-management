import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

interface SnackBarProp {
  message: string;
  status: string;
  onClose: () => void;
}

export default function CustomizedSnackbars(prop: Readonly<SnackBarProp>) {
  const [open, setOpen] = React.useState(true);

  const handleClose = (reason: string) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);

    prop.onClose();
  };

  return (
    <div>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={(event, reason) => {
          handleClose(reason);
        }}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => handleClose("")}
          severity={prop.status === "error" ? "error" : "success"}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {prop.message}
        </Alert>
      </Snackbar>
    </div>
  );
}
