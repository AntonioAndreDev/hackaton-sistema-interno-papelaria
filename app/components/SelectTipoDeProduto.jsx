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

function getStyles(tipo, tipoDeProduto, theme) {
  return {
    fontWeight:
      tipoDeProduto.indexOf(tipo) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function SelectTipoDeProduto() {
  const theme = useTheme();
  const [tipoDeProduto, setTipoDeProduto] = useState([]);

  const handleChange = (event) => {
    const value = event.target.value;
    setTipoDeProduto(typeof value === "string" ? value.split(",") : value);
  };

  console.log(tipoDeProduto);

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
          value={tipoDeProduto}
          onChange={handleChange}
          input={<OutlinedInput label="Tipo de Produto *" />}
          MenuProps={MenuProps}
        >
          {tipos.map((tipo) => (
            <MenuItem
              key={tipo}
              value={tipo}
              style={getStyles(tipo, tipoDeProduto, theme)}
            >
              {tipo}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
