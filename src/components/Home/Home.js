import { Box, Button, TextField } from "@mui/material";
import Header from "./Header";
import ResponsiveTable from "./Table";
import {  useNavigate } from "react-router-dom";
import TableMonth from "./TableMonth";
import TableYearly from "./TableYearly";
import BasicSelect from "./Select";
import { useState } from "react";
import CustomDatePicker from "./DatePicker";

const Home = () => {
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [dateFilter, setDateFilter] = useState(null);

  const handleInputChange = (event) => {
    const { value } = event.target;
    setSearch(value);
  };

  const navigate = useNavigate();
  return (
    <>
      <Header page={"home"} />
      <Box
        sx={{
          padding: { md: "2rem 4rem", xs: "2rem 1rem" },
        }}
      >
        {/* transaction table filter */}
        <div
          style={{
            fontWeight: "bold",
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "1rem",
          }}
        >
          {filter === "all" ? (
            <TextField
              id="search-basic"
              label="Search"
              variant="standard"
              placeholder="Search...."
              onChange={handleInputChange}
              fullWidth
            />
          ) : null}
        </div>

        <div
          style={{
            fontWeight: "bold",
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "1rem",
          }}
        >
          {filter === "all" ? (
            <CustomDatePicker
              dateFilter={dateFilter}
              setDateFilter={setDateFilter}
            />
          ) : (
            <Box></Box>
          )}
          <BasicSelect filter={filter} setFilter={setFilter}  setDateFilter = {setDateFilter}/>
        </div>

        <div
          style={{
            fontSize: "2rem",
            fontWeight: "bold",
            width: "100%",
            color: "#1976d2",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "1rem",
          }}
        >
          All Transactions
        </div>
        {filter === "all" ? (
          <ResponsiveTable search={search} dateFilter={dateFilter} />
        ) : filter === "month" ? (
          <TableMonth />
        ) : (
          <TableYearly />
        )}
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "end",
            // paddingLeft:"25px"
          }}
        >
          <Button
            type="submit"
            // fullWidth
            variant="contained"
            sx={{
              fontSize: "16px",
              textTransform: "capitalize",
              margin: "25px",
              // background: "var(--joy-palette-info-200, #E1CBFF)",
              // color: "#fff",
            }}
            onClick={() => {
              navigate("/add");
            }}
          >
            Add Records
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default Home;
