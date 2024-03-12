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
import { Button, imageListItemBarClasses } from "@mui/material";
import { IoMdEye } from "react-icons/io";
import CustomModal from "../../../composnents/CustomModal";
import { useState } from "react";
import HouseForm from "./HouseForm";
import ResidentHistoryTable from "./ResidentHistoryTable";

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

function createData(id, residentName, inhabitStatus) {
  return {
    id,
    residentName,
    inhabitStatus,
  };
}

const SAMPLE_DATA = [
  createData(1, "John Doe", "Permanent"),
  createData(2, "John Doe", "Permanent"),
  createData(3, "John Doe", "Permanent"),
  createData(4, "John Doe", "Permanent"),
  createData(5, "John Doe", "Permanent"),
  createData(6, "John Doe", "Permanent"),
];

const HouseTable = () => {
  const [isEdit, setIsEdit] = useState(null);
  const [isOpenHistory, setIsOpenHistory] = useState(false);
  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 1000 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center"> Id </StyledTableCell>
              <StyledTableCell align="center"> Nama Lengkap </StyledTableCell>
              <StyledTableCell align="center"> Status Huni </StyledTableCell>
              <StyledTableCell align="center">Aksi</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {SAMPLE_DATA.map((item, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell align="center" component="th" scope="row">
                  {"RC-" + String(item.id).padStart(4, "0")}
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
                      onClick={() => setIsEdit(true)}
                      startIcon={<MdModeEdit />}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      size="large"
                      onClick={() => setIsOpenHistory(true)}
                      startIcon={<IoMdEye />}
                    >
                      Riwayat Penghuni
                    </Button>
                  </div>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <CustomModal open={isEdit} onClose={() => setIsEdit(false)}>
        <HouseForm onCancel={() => setIsEdit(false)} />
      </CustomModal>
      <CustomModal open={isOpenHistory} onClose={() => setIsOpenHistory(false)}>
        <ResidentHistoryTable />
      </CustomModal>
    </>
  );
};

export default HouseTable;
