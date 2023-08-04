import { Box, TextField } from "@mui/material";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import CustomDatePicker from "./DatePicker";
import HistoryTable from "./HistoryTable";
import "./HistoryPage.css"
const HistoryPage = () => {
  const [search, setSearch] = useState("");
  const [dateFilter, setDateFilter] = useState(null);

  const handleInputChange = (event) => {
    const { value } = event.target;
    setSearch(value);
  };

  const navigate = useNavigate();
  return (
    <>
      <Header page={"history"} />
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
          <CustomDatePicker
            dateFilter={dateFilter}
            setDateFilter={setDateFilter}
            sx={{
                width:"20%"
            }}
          />
          <TextField
            id="search-basic"
            label="Search"
            variant="standard"
            placeholder="Search...."
            onChange={handleInputChange}
            sx={{
                width:"70%"
            }}
            // fullWidth
          />
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
        ></div>

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
            textAlign:"center"
          }}
        >
          Transactions History
        </div>

        <HistoryTable search={search} dateFilter={dateFilter} />
      </Box>
    </>
  );
};

export default HistoryPage;
