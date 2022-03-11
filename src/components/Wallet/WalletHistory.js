import React, { useEffect, useState } from "react";
// import { BsCaretUpFill, BsCaretDownFill } from "react-icons/bs";
// import useState from "react-usestateref";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export const WalletHistory = () => {
  const [walletHistory, setWalletHistory] = useState([]);
  const [search, setSearch] = useState("");

  async function getWalletHistory() {
    try {
      const response = await fetch(
        "http://157.245.57.54:5000/display/payment",
        {
          method: "GET",
          headers: { token: localStorage.token },
        }
      );

      const parseRes = await response.json();
      console.log(parseRes);
      setWalletHistory(parseRes);
    } catch (error) {
      console.error(error.message);
    }
  }

  useEffect(() => {
    getWalletHistory();
  }, []);

  return (
    <div className="App">
      <input
        type="text"
        placeholder="Search"
        onChange={(e) => {
          setSearch(e.target.value);
        }}
      />

      <TableContainer
        component={Paper}
        className="overflow-y-auto max-h-80 scrollbar"
      >
        <Table
          aria-label="customized table"
          className="w-10/12 m-auto mb-6 overflow-scroll text-xl font-bold text-white rounded table-fixed"
        >
          <TableHead>
            <TableRow>
              <StyledTableCell>Payment ID</StyledTableCell>
              <StyledTableCell align="right">Type</StyledTableCell>
              <StyledTableCell align="right">Date</StyledTableCell>
              <StyledTableCell align="right">Amount</StyledTableCell>
              <StyledTableCell align="right">Status</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {walletHistory
              .filter((item) => {
                if (search === "") {
                  return item;
                } else if (
                  item.payment_type.toLowerCase().includes(search.toLowerCase())
                ) {
                  return item;
                }
              })
              .map((item) => {
                return (
                  // <p>
                  //   {item.payment_id} - {item.payment_type} - {item.payment_timestamp}{" "}
                  //   - {item.payment_amount} - {item.payment_status}
                  // </p>
                  <StyledTableRow key={item.payment_id}>
                    <StyledTableCell component="th" scope="row">
                      {item.payment_id}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {item.payment_type}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {item.payment_timestamp}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {item.payment_amount}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {item.payment_status}
                    </StyledTableCell>
                  </StyledTableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
