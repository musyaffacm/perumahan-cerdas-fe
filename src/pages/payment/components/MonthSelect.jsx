import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useState } from "react";
import { STATIC_MONTH } from "../../../constant/global";

const MonthSelect = ({ value = null, onChange = () => {} }) => {
  return (
    <FormControl sx={{ m: 1, minWidth: 100 }}>
      <InputLabel id="demo-simple-select-label">Bulan</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={value}
        label="Bulan"
        onChange={(e) => onChange(e.target.value)}
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
