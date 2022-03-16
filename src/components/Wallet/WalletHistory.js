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
    color: "#84C7EF",
  },
  [`&.${tableCellClasses.body}`]: {
    color: "white",
    fontSize: 16,
    fontWeight: "medium",
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

export const WalletHistory = () => {
  const [fetchingdata, setFetchingData] = useState(true);
  const [walletHistory, setWalletHistory] = useState([]);
  const [search, setSearch] = useState("");

  async function getWalletHistory() {
    try {
      const response = await fetch("https://api.comd5.xyz/display/payment", {
        method: "GET",
        headers: { token: localStorage.token },
      });

      const parseRes = await response.json();
      console.log(parseRes);
      setWalletHistory(parseRes.reverse());
      setFetchingData(false);
    } catch (error) {
      console.error(error.message);
    }
  }

  useEffect(() => {
    getWalletHistory();

    return () => {
      setWalletHistory([]);
    };
  }, []);

  return (
    <div className="mx-3 p-1 border-8 App box border-[#376db3] rounded-xl mb-7 xl:mx-24">
      <div className="flex mb-2">
        <p className="w-full text-2xl font-bold text-center text-white pt-7 sm:text-left sm:pl-10 sm:pb-4">
          TRANSACTION HISTORY
        </p>
        {/* <input
          type="text"
          placeholder="Search"
          className="w-32 h-8 mt-1 mr-1 rounded"
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        /> */}
      </div>
      <TableContainer
        component={Paper}
        className="max-h-[32rem] xl:max-h-[18rem] overflow-y-auto scrollbar"
      >
        <Table
          className="overflow-scroll text-xl font-bold text-white rounded "
          stickyHeader
        >
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">Payment ID</StyledTableCell>
              <StyledTableCell align="center">Type</StyledTableCell>
              <StyledTableCell align="center">Date</StyledTableCell>
              <StyledTableCell align="center">Amount</StyledTableCell>
              <StyledTableCell align="center">Status</StyledTableCell>
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
                  <StyledTableRow key={item.payment_id}>
                    <StyledTableCell component="th" scope="row" align="center">
                      {item.payment_id}
                    </StyledTableCell>
                    <StyledTableCell align="center" sx={{ fontWeight: "bold" }}>
                      {item.payment_type}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {new Date(item.payment_timestamp * 1000).toDateString()}
                      <br />
                      {new Date(
                        item.payment_timestamp * 1000
                      ).toLocaleTimeString()}
                    </StyledTableCell>
                    <StyledTableCell align="center" sx={{ fontWeight: "bold" }}>
                      ${item.payment_amount}
                    </StyledTableCell>
                    <StyledTableCell align="center">
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
