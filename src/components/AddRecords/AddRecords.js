import React, { useState } from "react";
import Header from "../Home/Header";
import { Container,  TextField, Button, Box } from "@mui/material";
import { add_Record_API } from "../functions/user";
import { useNavigate } from "react-router-dom";
import moment from "moment";

export const AddRecords = () => {
  const [spendBy, setSpendBy] = useState("");
  const [dateValue, setDateValue] = useState(new Date());
  const [spendFor, setSpendFor] = useState("");
  const [amount, setAmount] = useState(0);
  const [spendByError, setSpendByError] = useState(false);
  const [spendForError, setSpendForError] = useState(false);
  const [amountError, setAmountError] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSpendByError(false);
    setSpendForError(false);
    setAmountError(false);
    if (spendBy === "") {
      setSpendByError(true);
      return;
    }
    if (spendFor === "") {
      setSpendForError(true);
      return;
    }
    if (amount === "" || amount <= 0) {
      setAmountError(true);
      return;
    }
    if (spendBy && spendFor && amount) {
      await add_Record_API({
        spendBy,
        spendFor,
        amount,
        dateValue: moment(dateValue).format("YYYY-MM-DD[T00:00:00.000Z]"),
      });
      navigate("/");
    }
  };

  return (
    <>
      <Header page={"addrecords"} />
      <Container
        sx={{
          width: { xs: "95%", md: "70%" },
        }}
      >
        <form autoComplete="off" onSubmit={handleSubmit}>
          <h2>Today's Transaction</h2>
          <TextField
            label="Spend Money by"
            onChange={(e) => setSpendBy(e.target.value)}
            required
            variant="outlined"
            color="primary"
            type="text"
            sx={{ mb: 3 }}
            fullWidth
            value={spendBy}
            error={spendByError}
          />
          <TextField
            label="Spend Money For"
            onChange={(e) => setSpendFor(e.target.value)}
            required
            variant="outlined"
            color="primary"
            type="text"
            rows={3}
            multiline
            sx={{ mb: 3 }}
            fullWidth
            value={spendFor}
            error={spendForError}
          />
          <TextField
            label="Amount"
            onChange={(e) => setAmount(e.target.value)}
            required
            variant="outlined"
            color="primary"
            type="number"
            value={amount}
            error={amountError}
            fullWidth
            sx={{ mb: 3 }}
          />
          <TextField
            label="Date"
            onChange={(e) => setDateValue(e.target.value)}
            variant="outlined"
            color="primary"
            type="date"
            value={dateValue}
            fullWidth
            sx={{ mb: 3 }}
          />
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Button
              //   type="submit"
              //   fullWidth
              variant="contained"
              onClick={() => {
                navigate("/");
              }}
            >
              Records
            </Button>
            <Button variant="contained" color="primary" type="submit">
              Save
            </Button>
          </Box>
        </form>
      </Container>
    </>
  );
};
