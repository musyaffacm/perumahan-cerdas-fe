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
    paymentType: item?.label || "-",
    nominal: item?.fee || "-",
  }));
};

const PaymentTypeTable = ({ data }) => {
  const mappedData = mappingData(data);
  return (
    <div className="space-y-3">
      <div className="text-2xl font-semibold text-black w-full text-left">
        Jenis Pembayaran
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 500 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center"> Id </StyledTableCell>
              <StyledTableCell align="center">Jenis Pembayaran</StyledTableCell>
              <StyledTableCell align="center"> Nominal </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {mappedData.map((item, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell align="center" component="th" scope="row">
                  {"PR-" + String(item.id).padStart(4, "0")}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {item.paymentType}
                </StyledTableCell>
                <StyledTableCell align="center">{item.nominal}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default PaymentTypeTable;
