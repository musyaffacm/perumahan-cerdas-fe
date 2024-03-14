import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { MdModeEdit } from "react-icons/md";
import { Button } from "@mui/material";
import { IoMdEye } from "react-icons/io";
import { useState } from "react";
import { formatHouseId } from "../../../lib/helper";

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
    residentId: item?.is_inhabit?.resident?.id,
    residentName: item?.is_inhabit?.resident?.fullname || "-",
    inhabitStatus: item?.is_inhabit ? "Dihuni" : "Tidak Dihuni" || "-",
  }));
};

const HouseTable = (props) => {
  const {
    data,
    onClickEdit = () => {},
    onClickHistory = () => {},
    onClickPaymentHistory = () => {},
    onClickPaymentStatus = () => {},
  } = props;
  const [isEdit, setIsEdit] = useState(null);
  const [isOpenHistory, setIsOpenHistory] = useState(false);
  const mappedData = mappingData(data);
  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 1300 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center"> Id </StyledTableCell>
              <StyledTableCell align="center"> Nama Lengkap </StyledTableCell>
              <StyledTableCell align="center"> Status Huni </StyledTableCell>
              <StyledTableCell align="center">Aksi</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {mappedData.map((item, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell align="center" component="th" scope="row">
                  {formatHouseId(item.id)}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {item.residentName}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {item.inhabitStatus}
                </StyledTableCell>
                <StyledTableCell align="center">
                  <div className="space-x-3">
                    <Button
                      variant="contained"
                      color="warning"
                      size="large"
                      onClick={() => onClickEdit(item.id)}
                      startIcon={<MdModeEdit />}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      size="large"
                      onClick={() => onClickHistory(item.id)}
                      startIcon={<IoMdEye />}
                    >
                      Riwayat Penghuni
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      size="large"
                      onClick={() => onClickPaymentHistory(item.residentId)}
                      startIcon={<IoMdEye />}
                    >
                      Riwayat Pembayaran
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      size="large"
                      onClick={() => onClickPaymentStatus(item.residentId)}
                      startIcon={<IoMdEye />}
                    >
                      Iuran
                    </Button>
                  </div>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default HouseTable;
