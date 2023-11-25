"use client";
import { useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useState } from "react";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const tipos = ["Artigos de Papelaria", "Material Escolar", "Material Técnico"];

export default function SelectTipoDeProduto({ onChange, value }) {
  const theme = useTheme();

  return (
    <div>
      <FormControl sx={{ width: 300 }}>
        <InputLabel className="text-lg" id="demo-multiple-name-label">
          Tipo de Produto *
        </InputLabel>
        <Select
          required
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          value={value}
          onChange={onChange}
          input={<OutlinedInput label="Tipo de Produto *" />}
          MenuProps={MenuProps}
        >
          {tipos.map((tipo) => (
            <MenuItem key={tipo} value={tipo}>
              {tipo}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
