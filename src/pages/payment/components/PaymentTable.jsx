import * as React from "react";
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
    fontSize: 18,
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

function createData(id, residentName, paymentLabel) {
  return {
    id,
    residentName,
    paymentLabel,
  };
}

const SAMPLE_DATA = [
  createData(1, "John Doe", "Satpam"),
  createData(2, "John Doe", "Satpam"),
  createData(3, "John Doe", "Satpam"),
  createData(4, "John Doe", "Kebersihan"),
  createData(5, "John Doe", "Kebersihan"),
  createData(6, "John Doe", "Kebersihan"),
];

const PaymentTable = () => {
  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 1000 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center"> Id </StyledTableCell>
              <StyledTableCell align="center"> Nama Lengkap </StyledTableCell>
              <StyledTableCell align="center">Jenis Pembayaran</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {SAMPLE_DATA.map((item, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell align="center" component="th" scope="row">
                  {"PR-" + String(item.id).padStart(4, "0")}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {item.residentName}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {item.paymentLabel}
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default PaymentTable;
