import React, { useState, useEffect } from "react";
import "./styles.modules.css";
// import buyicon from "../../asset/images/buy_icon.png";
// import sellicon from "../../asset/images/sell_icon.png";
// import goldicon from "../../asset/images/gold.png";
// import silvericon from "../../asset/images/silver.png";
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

export const TransactionHistory = () => {
  const [transactionHistory, setTransactionHistory] = useState([]);
  const [search, setSearch] = useState("");

  async function getTransactionHistory() {
    try {
      const response = await fetch(
        "http://157.245.57.54:5000/display/transaction",
        {
          method: "GET",
          headers: { token: localStorage.token },
        }
      );

      const parseRes = await response.json();
      console.table(parseRes);
      setTransactionHistory(parseRes);
    } catch (error) {
      console.error(error.message);
    }
  }

  useEffect(() => {
    getTransactionHistory();
  }, []);

  return (
    <div className="history">
      <input
        type="text"
        placeholder="Search"
        onChange={(e) => {
          setSearch(e.target.value);
        }}
      />

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Transaction Type</StyledTableCell>
              <StyledTableCell align="right">Ref ID</StyledTableCell>
              <StyledTableCell align="right">Date</StyledTableCell>
              <StyledTableCell align="right">Transaction</StyledTableCell>
              <StyledTableCell align="right">Amount</StyledTableCell>
              <StyledTableCell align="right">Asset Amount</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactionHistory
              .filter((item) => {
                if (search === "") {
                  return item;
                } else if (
                  item.tx_asset.toLowerCase().includes(search.toLowerCase())
                ) {
                  return item;
                }
              })
              .map((item) => {
                return (
                  <StyledTableRow key={item.tx_id}>
                    <StyledTableCell component="th" scope="row">
                      {item.tx_asset}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {item.tx_id}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {item.timestamp}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {item.tx_type}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {item.tx_amount}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {item.tx_asset_amount}
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
