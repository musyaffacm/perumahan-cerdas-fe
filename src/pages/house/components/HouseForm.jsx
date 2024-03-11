import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { useState } from "react";

const createResidentData = (id, fullname) => {
  return { id, fullname };
};

const createInhabitData = (id, label) => {
  return { id, label };
};

const SAMPLE_DATA_RESIDENT = [
  createResidentData(1, "John Doe 1"),
  createResidentData(2, "John Doe 2"),
  createResidentData(3, "John Doe 3"),
  createResidentData(4, "John Doe 4"),
  createResidentData(5, "John Doe 5"),
];

const SAMPLE_DATA_INHABIT_STATUS = [
  createInhabitData(1, "Permanen"),
  createInhabitData(2, "Kontrak"),
];

const HouseForm = (props) => {
  const { onCancel = () => {}, onSubmit = () => {} } = props;
  const [resident, setResident] = useState(null);
  const [inhabitStatus, setInhabitStatus] = useState(null);
  return (
    <>
      <div className="text-xl font-semibold text-gray-800 mb-10 text-center">
        Form Data Rumah
      </div>

      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Penghuni</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={resident}
          label="Pilih penghuni"
          onChange={(e) => setResident(e.target.value)}
        >
          {SAMPLE_DATA_RESIDENT.map((item) => (
            <MenuItem value={item}> {item.fullname} </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Status Huni</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={inhabitStatus}
          label="Pilih penghuni"
          onChange={(e) => setInhabitStatus(e.target.value)}
        >
          {SAMPLE_DATA_INHABIT_STATUS.map((item) => (
            <MenuItem value={item}> {item.label} </MenuItem>
          ))}
        </Select>
      </FormControl>

      <div className="mt-5 flex justify-end gap-x-5">
        <Button variant="contained" size="large" onClick={onCancel}>
          Batal
        </Button>
        <Button variant="contained" size="large" onClick={onSubmit}>
          Simpan
        </Button>
      </div>
    </>
  );
};

export default HouseForm;
