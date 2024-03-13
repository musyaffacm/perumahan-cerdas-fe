import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { formatDate } from "../../../lib/helper";

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

const mappingData = (data) => {
  return data.map((item) => ({
    id: item.id,
    residentName: item?.resident?.fullname || "-",
    paymentType: item?.payment?.label || "-",
    nominal: item?.payment?.fee || "-",
    dueDate: item?.payment_date || "-",
    paidDate: item?.created_at || "-",
  }));
};

const PaymentInTable = ({ data }) => {
  const mappedData = mappingData(data);
  return (
    <div className="space-y-3">
      <div className="text-2xl font-semibold text-black w-full text-left">
        Pemasukan
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 1000 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center"> Id </StyledTableCell>
              <StyledTableCell align="center"> Nama Penghuni </StyledTableCell>
              <StyledTableCell align="center">Jenis Pembayaran</StyledTableCell>
              <StyledTableCell align="center"> Nominal </StyledTableCell>
              <StyledTableCell align="center">
                Tanggal Jatuh Tempo
              </StyledTableCell>
              <StyledTableCell align="center">
                Tanggal Pembayaran
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {mappedData.map((item, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell align="center" component="th" scope="row">
                  {"PR-" + String(item.id).padStart(4, "0")}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {item.residentName}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {item.paymentType}
                </StyledTableCell>
                <StyledTableCell align="center">{item.nominal}</StyledTableCell>
                <StyledTableCell align="center">
                  {formatDate(item.dueDate)}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {formatDate(item.paidDate)}
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default PaymentInTable;
