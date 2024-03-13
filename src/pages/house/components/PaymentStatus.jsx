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
import { STATIC_MONTH } from "../../../constant/global";

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
    month: STATIC_MONTH.find((month) => month.id === item.month).label,
    paymentType: item?.payment_type || "-",
    isPaid: item?.is_paid ? "Sudah Lunas" : "Belum Lunas",
  }));
};

const PaymentStatus = ({ data }) => {
  const mappedData = mappingData(data.flat());

  return (
    <div className="space-y-3">
      <div className="text-2xl font-semibold text-black w-full text-left">
        Daftar Iuran
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 1000 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center"> Bulan </StyledTableCell>
              <StyledTableCell align="center">Jenis Iuran</StyledTableCell>
              <StyledTableCell align="center"> Telah Dibayar </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {mappedData.map((item, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell align="center" component="th" scope="row">
                  {item.month}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {item.paymentType}
                </StyledTableCell>
                <StyledTableCell align="center">{item.isPaid}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default PaymentStatus;
