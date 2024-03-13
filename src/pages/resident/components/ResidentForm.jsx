import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";

const ResidentForm = (props) => {
  const {
    value = null,
    loading = false,
    onClose = () => {},
    onSubmit = () => {},
  } = props;
  const [state, setState] = useState({
    fullname: value?.fullname || "",
    phoneNumber: value?.phone_number || "",
    isMarried: value?.is_married ? 1 : 0,
    identityPhoto: null,
  });

  // useEffect(() => {
  //   if (typeof value?.identity_photo_path === "string") {
  //     const IdentityFile = new File(value?.identity_photo_path);
  //     setState((prev) => ({ ...prev, identityPhoto: IdentityFile }));
  //   }
  // }, []);

  return (
    <>
      <div className="text-xl font-semibold text-gray-800 mb-10 text-center">
        Form Data Penghuni
      </div>
      <FormControl>
        <FormLabel className="text-gray-950" htmlFor="fullname">
          Nama Lengkap
        </FormLabel>
        <TextField
          id="fullname"
          variant="outlined"
          value={state.fullname}
          onChange={(e) =>
            setState((prev) => ({ ...prev, fullname: e.target.value }))
          }
        />
      </FormControl>
      <FormControl>
        <FormLabel className="text-gray-950" htmlFor="phone_number">
          Nomor Handpone
        </FormLabel>
        <TextField
          id="phone_number"
          variant="outlined"
          value={state.phoneNumber}
          onChange={(e) =>
            setState((prev) => ({ ...prev, phoneNumber: e.target.value }))
          }
        />
      </FormControl>
      <FormControl>
        <FormLabel className="text-gray-950" htmlFor="is_married">
          Status Pernikahan
        </FormLabel>
        <RadioGroup
          aria-labelledby="is_married"
          name="radio-buttons-group"
          value={state.isMarried}
          onChange={(e) =>
            setState((prev) => ({ ...prev, isMarried: e.target.value }))
          }
        >
          <FormControlLabel
            value={0}
            control={<Radio />}
            label="Belum Menikah"
          />
          <FormControlLabel
            value={1}
            control={<Radio />}
            label="Sudah Menikah"
          />
        </RadioGroup>
      </FormControl>
      <FormControl>
        <FormLabel htmlFor="identity_photo">Foto KTP</FormLabel>
        <input
          type="file"
          name="identity_photo"
          id="identity_photo"
          className="border border-slate-600 py-2 px-5 rounded"
          // value={state.identityPhoto}
          onChange={(e) =>
            setState((prev) => ({
              ...prev,
              identityPhoto: e.target.files[0],
            }))
          }
        />
      </FormControl>

      <div className="mt-5 flex justify-end gap-x-5">
        <Button variant="contained" size="large" onClick={onClose}>
          Batal
        </Button>
        <Button
          variant="contained"
          size="large"
          disabled={loading}
          onClick={() => onSubmit(state)}
        >
          {loading ? "Loading" : "Simpan"}
        </Button>
      </div>
    </>
  );
};

export default ResidentForm;
