import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { get_Records_yearly } from "../functions/user";
import { useSelector } from "react-redux";
import { removeDuplicateColumns } from "./TableMonth";

// const columns = [
//   {
//     id: "year",
//     label: "Year",
//     minWidth: 150,
//   },
//   {
//     id: "total",
//     label: "Amount",
//     minWidth: 100,
//   },
// ];

export default function TableYearly() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [tableData, setTableData] = React.useState(null);
  const [columns, setColumns] = React.useState([
    {
      id: "year",
      label: "Year",
      minWidth: 150,
    },
  ]);
  const userData = useSelector((state) => {
    return state.user;
  });

  const getData = React.useCallback(async () => {
    let dt = await get_Records_yearly({ userData });
    let columnList = [];
    setTableData(
      dt.record.map((e) => {
        let addList = e.expenses.map((ele) => {
          let val = ele.expenseType.replace(/[^a-zA-Z0-9]/g, "");
          if (val === "total") val = "total1";
          columnList.push({
            id: `${val}`,
            label: ele.expenseType,
            minWidth: 150,
          });
          return {
            [`${val}`]: ele.totalAmount,
          };
        });

        return {
          ...e,
          ...addList.reduce((e, a) => {
            return { ...a, ...e };
          }, {}),
        };
      })
    );

    let newList = [...columns, ...columnList];
    const uniqueColumns = removeDuplicateColumns(newList);

    setColumns([
      ...uniqueColumns,
      {
        id: "total",
        label: "Amount",
        minWidth: 100,
      },
    ]);
  }, [userData]);

  React.useEffect(() => {
    if (userData) getData();
  }, [userData, getData]);

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
                      if (column.id === "year") {
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
