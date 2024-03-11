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
  const { open = false, onClose = () => {}, onSubmit = () => {} } = props;
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
          <TextField id="fullname" variant="outlined" />
        </FormControl>
        <FormControl>
          <FormLabel className="text-gray-950" htmlFor="phone_number">
            Nomor Handpone
          </FormLabel>
          <TextField id="phone_number" variant="outlined" />
        </FormControl>

        <FormControl>
          <FormLabel className="text-gray-950" htmlFor="resident_status">
            Status Huni
          </FormLabel>
          <RadioGroup
            aria-labelledby="resident_status"
            defaultValue="permanent"
            name="radio-buttons-group"
          >
            <FormControlLabel
              value="permanent"
              control={<Radio />}
              label="Permanent"
            />
            <FormControlLabel
              value="kontrak"
              control={<Radio />}
              label="Kontrak"
            />
          </RadioGroup>
        </FormControl>
        <FormControl>
          <FormLabel className="text-gray-950" htmlFor="is_married">
            Status Pernikahan
          </FormLabel>
          <RadioGroup
            aria-labelledby="is_married"
            defaultValue="permanent"
            name="radio-buttons-group"
          >
            <FormControlLabel
              value={false}
              control={<Radio />}
              label="Belum Menikah"
            />
            <FormControlLabel
              value={true}
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
          />
        </FormControl>

        <div className="mt-5 flex justify-end gap-x-5">
          <Button variant="contained" size="large" onClick={onClose}>
            Batal
          </Button>
          <Button variant="contained" size="large" onClick={onSubmit}>
            Simpan
          </Button>
        </div>
      </Box>
    </Modal>
  );
};

export default AddResidentModal;
