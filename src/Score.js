import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Snackbar, Alert } from "@mui/material";

// CSS.
import './styles/Score.css';

const ScoreDisplay = ({ score, total }) => (
  <Link to="/timeline/">
    Bingos: {score}/{total}
  </Link>
);

ScoreDisplay.propTypes = {
  score: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
};

const Score = ({ score, total }) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleBingo = (evt) => {
      evt.stopImmediatePropagation();
      setOpen(true);
    };

    document.addEventListener("bingo:add", handleBingo);

    return () => {
      document.removeEventListener("bingo:add", handleBingo);
    };
  }, []);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <div className="Score">
      <ScoreDisplay score={score} total={total} />
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={open}
        autoHideDuration={1500}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Bingo! Updating your score
        </Alert>
      </Snackbar>
    </div>
  );
};

Score.propTypes = {
  score: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
};

export default Score;
