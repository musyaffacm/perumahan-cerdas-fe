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
import { IoIosEye } from "react-icons/io";
import CustomModal from "../../../components/CustomModal";
import { useState } from "react";
import { BASE_BE_URL } from "../../../constant/global";

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

function createData(
  name,
  residentStatus,
  phoneNumber,
  marriedStatus,
  identityPhoto
) {
  return { name, residentStatus, phoneNumber, marriedStatus, identityPhoto };
}

const mappingData = (data) => {
  return data.map((item) => ({
    id: item.id,
    name: item.fullname,
    residentStatus: item.status,
    phoneNumber: item.phone_number,
    marriedStatus: item.is_married ? "Sudah Menikah" : "Belum Menikah",
    identityPhoto: item.identity_photo_path,
  }));
};

const ResidentTable = ({ data, onClickEdit = () => {} }) => {
  const [imgSrc, setImgSrc] = useState(null);
  const mappedData = mappingData(data);

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 1000 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center"> Nama Lengkap </StyledTableCell>
              <StyledTableCell align="center"> Status Huni </StyledTableCell>
              <StyledTableCell align="center"> Nomor HP </StyledTableCell>
              <StyledTableCell align="center">Sudah Menikah</StyledTableCell>
              <StyledTableCell align="center">KTP</StyledTableCell>
              <StyledTableCell align="center">Aksi</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {mappedData.map((item, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell align="center" component="th" scope="row">
                  {item.name}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {item.residentStatus}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {item.phoneNumber}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {item.marriedStatus}
                </StyledTableCell>
                <StyledTableCell align="center">
                  <Button
                    variant="contained"
                    size="large"
                    onClick={() => setImgSrc(item.identityPhoto)}
                    startIcon={<IoIosEye className="text-3l" />}
                  />
                </StyledTableCell>
                <StyledTableCell align="center">
                  <Button
                    variant="contained"
                    color="warning"
                    size="large"
                    onClick={() => onClickEdit(item.id)}
                    startIcon={<MdModeEdit />}
                  >
                    Edit
                  </Button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <CustomModal open={imgSrc !== null} onClose={() => setImgSrc(null)}>
        <img src={BASE_BE_URL + "/" + imgSrc} />
      </CustomModal>
    </>
  );
};

export default ResidentTable;
