import React, { useState, useEffect } from "react";
import "./styles.modules.css";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import buyicon from "../asset/images/buy_icon.png";
import sellicon from "../asset/images/sell_icon.png";
import { Header } from "components/Header";
import goldicon from "../asset/images/goldcoin.png";
import silvericon from "../asset/images/silvercoin.png";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: "#84C7EF",
  },
  [`&.${tableCellClasses.body}`]: {
    color: "white",
    fontSize: 14,
    fontWeight: 600,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: "#059DE6",
  },
  "&:nth-of-type(even)": {
    backgroundColor: "#122746",
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
      setTransactionHistory(parseRes.reverse());
    } catch (error) {
      console.error(error.message);
    }
  }

  useEffect(() => {
    getTransactionHistory();
  }, []);

  return (
    <>
      <Header title={"TRANSACTION"} />
      <div className="mx-6 p-10 mt-10 bg-[#075F93] rounded-xl  history">
        <div className="flex mb-5">
          <p className="mr-10 text-4xl font-bold text-white">History</p>
          {/* <input
            type="text"
            placeholder="Search"
            className="rounded-xl"
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          /> */}
        </div>
        <TableContainer
          component={Paper}
          className="overflow-y-auto max-h-[40rem] scrollbar"
        >
          <Table
            sx={{ minWidth: 700 }}
            aria-label="customized table"
            className="m-auto overflow-scroll text-xl font-bold text-white rounded table-fixed "
          >
            <TableHead>
              <TableRow>
                <StyledTableCell align="center">
                  Transaction Type
                </StyledTableCell>
                <StyledTableCell align="center">Ref ID</StyledTableCell>
                <StyledTableCell align="center">Date</StyledTableCell>
                <StyledTableCell align="center">Transaction</StyledTableCell>
                <StyledTableCell align="center">Amount</StyledTableCell>
                <StyledTableCell align="center">Asset Amount</StyledTableCell>
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
                        {item.tx_asset === "gold" ? (
                          <img src={goldicon} className="m-auto" />
                        ) : (
                          <img src={silvericon} className="m-auto" />
                        )}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {item.tx_id}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {new Date(item.timestamp * 1000).toDateString()}
                        <br />
                        {new Date(item.timestamp * 1000).toLocaleTimeString()}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {item.tx_type === "buy" ? (
                          <img src={buyicon} className="m-auto" />
                        ) : (
                          <img src={sellicon} className="m-auto" />
                        )}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        $ {item.tx_amount}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {item.tx_asset_amount}
                      </StyledTableCell>
                    </StyledTableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
};
