import { Button, TextField } from "@mui/material";
import { useState } from "react";

const PaymentTypeForm = (props) => {
  const { onCancel = () => {}, onSubmit = () => {} } = props;
  const [state, setState] = useState({
    label: null,
    fee: null,
  });
  return (
    <>
      <div className="text-xl font-semibold text-gray-800 mb-10 text-center">
        Form Jenis Pembayaran
      </div>

      <TextField
        value={state.label}
        label="Label"
        onChange={(e) =>
          setState((prev) => ({ ...prev, label: e.target.value }))
        }
      />

      <TextField
        value={state.fee}
        label="Nominal"
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
        onChange={(e) => setState((prev) => ({ ...prev, fee: e.target.value }))}
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

export default PaymentTypeForm;
