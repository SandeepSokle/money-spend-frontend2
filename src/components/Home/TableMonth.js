import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Button } from "@mui/material";
import { get_Records, get_Records_monthly } from "../functions/user";
import moment from "moment/moment";
import { useNavigate } from "react-router-dom";

const monthArray = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const columns = [
  {
    id: "month",
    label: "Month",
    minWidth: 150,
  },
  {
    id: "year",
    label: "Year",
    minWidth: 150,
  },
  {
    id: "total",
    label: "Amount",
    minWidth: 100,
  },
];

export default function TableMonth() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [tableData, setTableData] = React.useState(null);
  const navigate = useNavigate();

  const getData = async () => {
    let dt = await get_Records_monthly();

    console.log({ dt });
    setTableData(dt.record);
  };

  React.useEffect(() => {
    getData();
  }, []);

  console.log({
    tableData,
  });

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: "100%" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  width={{ md: "18rem", xs: "12rem" }}
                  key={column.id}
                  align={column.align}
                  sx={{
                    fontSize: { md: "18px", xs: "12px" },
                    fontWeight: "bold",
                    color: "#000",
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData
              ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      if (column.id == "month") {
                        return (
                          <TableCell
                            width={{ md: "18rem", xs: "12rem" }}
                            key={column.id}
                            align={column.align}
                          >
                            {/* {row._id[column.id]} */}
                            {monthArray[row._id[column.id] - 1]}
                          </TableCell>
                        );
                      } else if (column.id == "year") {
                        return (
                          <TableCell
                            width={{ md: "18rem", xs: "12rem" }}
                            key={column.id}
                            align={column.align}
                          >
                            {row._id[column.id]}
                          </TableCell>
                        );
                      } else {
                        return (
                          <TableCell
                            width={{ md: "18rem", xs: "12rem" }}
                            key={column.id}
                            align={column.align}
                          >
                            {column.format && typeof value === "number"
                              ? column.format(value)
                              : value}
                          </TableCell>
                        );
                      }
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 100]}
        component="div"
        count={tableData?.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
