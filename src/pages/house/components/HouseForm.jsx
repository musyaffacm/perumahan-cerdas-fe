import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { useState } from "react";

const INHABIT_STATUS = [
  {
    value: "permanent",
    label: "Permanen",
  },
  {
    value: "temporary",
    label: "Kontrak",
  },
];

const HouseForm = (props) => {
  const {
    residentData,
    loading = false,
    onCancel = () => {},
    onSubmit = () => {},
  } = props;
  const [state, setState] = useState({
    resident: null,
    inhabitStatus: null,
  });
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
          value={state.resident}
          label="Pilih penghuni"
          onChange={(e) =>
            setState((prev) => ({ ...prev, resident: e.target.value }))
          }
        >
          {residentData.map((item) => (
            <MenuItem value={item}> {item.fullname} </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Status Huni</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={state.inhabitStatus}
          label="Pilih penghuni"
          onChange={(e) =>
            setState((prev) => ({ ...prev, inhabitStatus: e.target.value }))
          }
        >
          {INHABIT_STATUS.map((item) => (
            <MenuItem value={item}> {item.label} </MenuItem>
          ))}
        </Select>
      </FormControl>

      <div className="mt-5 flex justify-end gap-x-5">
        <Button variant="contained" size="large" onClick={onCancel}>
          Batal
        </Button>
        <Button
          variant="contained"
          size="large"
          onClick={() => onSubmit(state)}
          disabled={loading}
        >
          {loading ? "Loading" : "Simpan"}
        </Button>
      </div>
    </>
  );
};

export default HouseForm;
