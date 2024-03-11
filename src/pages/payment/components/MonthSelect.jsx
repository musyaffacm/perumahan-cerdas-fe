import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useState } from "react";

const createMonth = (id, label) => {
  return { id, label };
};

const STATIC_MONTH = [
  createMonth(1, "Januari"),
  createMonth(2, "Febuari"),
  createMonth(3, "Maret"),
  createMonth(4, "April"),
  createMonth(5, "Mei"),
  createMonth(6, "Juni"),
  createMonth(7, "Juli"),
  createMonth(8, "Agustus"),
  createMonth(9, "September"),
  createMonth(10, "Oktober"),
  createMonth(11, "November"),
  createMonth(12, "Desember"),
];

const MonthSelect = () => {
  const [month, setMonth] = useState(null);
  return (
    <FormControl sx={{ m: 1, minWidth: 100 }}>
      <InputLabel id="demo-simple-select-label">Bulan</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={month}
        label="Bulan"
        onChange={(e) => setMonth(e.target.value)}
      >
        {STATIC_MONTH.map((item, index) => (
          <MenuItem value={item} key={index}>
            {item.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default MonthSelect;
