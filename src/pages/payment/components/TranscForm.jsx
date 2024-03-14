import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useState } from "react";

const TranscForm = (props) => {
  const {
    paymentTypeData = null,
    residentData = null,
    onCancel = () => {},
    onSubmit = () => {},
  } = props;
  const [state, setState] = useState({
    resident: null,
    paymentType: null,
    nominal: null,
  });
  return (
    <>
      <div className="text-xl font-semibold text-gray-800 mb-10 text-center">
        Form Data Transaksi Pembayaran
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
        <InputLabel id="demo-simple-select-label">Jenis Pembayaran</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={state.paymentType}
          label="Pilih jenis pembayaran"
          onChange={(e) =>
            setState((prev) => ({ ...prev, paymentType: e.target.value }))
          }
        >
          {paymentTypeData.map((item) => (
            <MenuItem value={item}> {item.label} </MenuItem>
          ))}
        </Select>
      </FormControl>

      <TextField
        value={state.nominal}
        type="number"
        onKeyDown={(e) => {
          if (
            e.key === "e" ||
            e.key === "E" ||
            e.key === "-" ||
            e.key === "+"
          ) {
            e.preventDefault();
          }
        }}
        onChange={(e) =>
          setState((prev) => ({ ...prev, nominal: e.target.value }))
        }
      />

      <div className="mt-5 flex justify-end gap-x-5">
        <Button variant="contained" size="large" onClick={onCancel}>
          Batal
        </Button>
        <Button
          variant="contained"
          size="large"
          onClick={() => onSubmit(state)}
        >
          Simpan
        </Button>
      </div>
    </>
  );
};

export default TranscForm;
