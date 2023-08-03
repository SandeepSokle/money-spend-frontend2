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
import { get_Records } from "../functions/user";
import moment from "moment/moment";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useCallback } from "react";

const columns = [
  {
    id: "date",
    label: "Date",
    minWidth: 150,
    format: (value) => {
      return moment(value).format("LL");
    },
  },
  { id: "spendBy", label: "Money Spend By", minWidth: 150, search: true },
  {
    id: "spendFor",
    label: "Money Spend For",
    minWidth: 170,
  },
  {
    id: "amount",
    label: "Amount",
    minWidth: 100,
  },
  {
    id: "action",
    label: "Actions",
    minWidth: 150,
    align: "center",
  },
];

export default function ColumnGroupingTable({ search, dateFilter }) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [tableData, setTableData] = React.useState([]);
  const [completeData, setCompleteData] = React.useState([]);
  const navigate = useNavigate();

  const userData = useSelector((state) => {
    return state.user;
  });

  const getData = useCallback(async () => {
    if (userData._id) {
      let dt = await get_Records({ userData });
      setTableData(dt?.record);
      setCompleteData(dt?.record);
    }
  });

  React.useEffect(() => {
    if (userData) getData();
  }, [userData, getData]);

  React.useEffect(() => {
    if (search !== "" && dateFilter !== null) {
      setTableData(
        completeData.filter((ele) => {
          return (
            (ele.spendBy.toLowerCase().includes(search.toLowerCase()) ||
              ele.amount
                .toString()
                .toLowerCase()
                .includes(search.toLowerCase()) ||
              ele.spendFor.toLowerCase().includes(search.toLowerCase())) &&
            moment(ele.date).isSame(dateFilter, "day")
          );
        })
      );
    } else if (search === "" && dateFilter === null) {
      setTableData(completeData);
    } else if (search && search !== "") {
      setTableData(
        completeData.filter((ele) => {
          return (
            ele.spendBy.toLowerCase().includes(search.toLowerCase()) ||
            ele.amount
              .toString()
              .toLowerCase()
              .includes(search.toLowerCase()) ||
            ele.spendFor.toLowerCase().includes(search.toLowerCase())
          );
        })
      );
    } else {
      setTableData(
        completeData.filter((ele) => {
          return moment(ele.date).isSame(dateFilter, "day");
        })
      );
    }
  }, [search, dateFilter, completeData]);

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
              {columns.map((column, idx) => (
                <TableCell
                  width={{ md: "18rem", xs: "12rem" }}
                  key={`${column.id}_${new Date().toTimeString()}_${idx}`}
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
              .map((row, id) => {
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={`${row.code}_${new Date().toTimeString()}_${id}`}
                  >
                    {columns.map((column, idx) => {
                      const value = row[column.id];
                      if (column.id === "action") {
                        return (
                          <TableCell
                            width={{ md: "18rem", xs: "12rem" }}
                            key={`${
                              column.id
                            }_${new Date().toTimeString()}_${idx}`}
                            align={column.align}
                          >
                            <Button
                              onClick={() => {
                                navigate(`/edit/${row._id}`);
                              }}
                            >
                              Edit
                            </Button>
                            <Button
                              onClick={() => {
                                navigate(`/delete/${row._id}`);
                              }}
                            >
                              Delete
                            </Button>
                          </TableCell>
                        );
                      } else if (column.id === "date") {
                        return (
                          <TableCell
                            width={{ md: "18rem", xs: "12rem" }}
                            key={`${
                              column.id
                            }_${new Date().toTimeString()}_${idx}`}
                            align={column.align}
                          >
                            {moment(row[column.id]).format("LL")}
                          </TableCell>
                        );
                      } else {
                        return (
                          <TableCell
                            width={{ md: "18rem", xs: "12rem" }}
                            key={`${
                              column.id
                            }_${new Date().toTimeString()}_${idx}`}
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
      {tableData ? (
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 100]}
          component="div"
          count={tableData?.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      ) : null}
    </Paper>
  );
}
