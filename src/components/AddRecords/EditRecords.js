import React, { useEffect, useState } from "react";
import Header from "../Home/Header";
import { Container, TextField, Button, Box } from "@mui/material";
import { edit_Record_API } from "../functions/user";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../functions/config";
import moment from "moment";
import SelectInput from "./SelectInput";

export const EditRecords = () => {
  const [spendBy, setSpendBy] = useState("");
  const [dateValue, setDateValue] = useState(new Date());
  const [spendFor, setSpendFor] = useState("");
  const [amount, setAmount] = useState(0);
  const [spendByError, setSpendByError] = useState(false);
  const [spendForError, setSpendForError] = useState(false);
  const [amountError, setAmountError] = useState(false);
  const [expenceCategories, setExpenceCategories] = useState();
  const navigate = useNavigate();

  const { status, id } = useParams();

  const getTransactionData = async ({ id }) => {
    const token = window.localStorage.getItem("moneySpendsToken");
    try {
      let data = await axios.get(`${API_URL}transaction/get_record?id=${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      data = data.data.record;

      console.log({
        data,
      });

      if (!data) return;
      setSpendBy(data.spendBy);
      setDateValue(data.date);
      setExpenceCategories({
        value: data.expenceCategories,
        label: data.expenceCategories,
      });
      setSpendFor(data.spendFor);
      setAmount(data.amount);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (id) getTransactionData({ id });
  }, [id]);

  const handleSubmit = async (event) => {
    if (status === "delete") {
      const token = window.localStorage.getItem("moneySpendsToken");
      try {
        let data = await axios.post(
          `${API_URL}transaction/delete_record?id=${id}`,
          {
            spendBy,
            spendFor,
            amount,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        data = data.data.record;
        if (!data) return;
        navigate("/");
      } catch (err) {
        console.log(err);
        return;
      }
    } else {
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
        const record = await edit_Record_API({
          spendBy,
          spendFor,
          amount,
          expenceCategories: expenceCategories.value,
          dateValue,
          _id: id,
        });
        if (record) navigate("/");
      }
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
        <form autoComplete="off">
          <h2>Today's Transaction</h2>
          <TextField
            label="Spender"
            onChange={(e) => setSpendBy(e.target.value)}
            required
            variant="outlined"
            color="primary"
            type="text"
            disabled={status === "delete" || status === "edit"}
            sx={{ mb: 3 }}
            fullWidth
            value={spendBy}
            error={spendByError}
          />
          <SelectInput
             disabled={status === "delete"}
            expenceCategories={expenceCategories}
            setExpenceCategories={setExpenceCategories}
          />
          <TextField
            label="Expense Logs"
            onChange={(e) => setSpendFor(e.target.value)}
            required
            variant="outlined"
            color="primary"
            type="text"
            rows={3}
            disabled={status === "delete"}
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
            disabled={status === "delete"}
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
            disabled={status === "delete"}
            variant="outlined"
            color="primary"
            type="date"
            value={moment(dateValue).format("YYYY-MM-DD")}
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
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              {status === "delete" ? "Delete Record" : "Save Changes"}
            </Button>
          </Box>
        </form>
      </Container>
    </>
  );
};
