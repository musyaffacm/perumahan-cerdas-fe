import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Modal,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import { useState } from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const AddResidentModal = (props) => {
  const {
    loading = false,
    open = false,
    onClose = () => {},
    onSubmit = () => {},
  } = props;
  const [state, setState] = useState({
    fullname: "",
    phoneNumber: "",
    isMaried: false,
    identityPhoto: null,
  });

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style} className="flex flex-col gap-5">
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
      </Box>
    </Modal>
  );
};

export default AddResidentModal;
