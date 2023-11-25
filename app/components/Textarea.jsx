"use client";
import * as React from "react";
import { TextareaAutosize as BaseTextareaAutosize } from "@mui/base/TextareaAutosize";
import { styled } from "@mui/system";

export default function Textarea({ onChange, value, placeholder }) {
  const blue = {
    100: "#DAECFF",
    200: "#b6daff",
    400: "#3399FF",
    500: "#007FFF",
    600: "#0072E5",
    900: "#003A75",
  };

  const grey = {
    50: "#F3F6F9",
    100: "#E5EAF2",
    200: "#DAE2ED",
    300: "#C7D0DD",
    400: "#B0B8C4",
    500: "#9DA8B7",
    600: "#6B7A90",
    700: "#434D5B",
    800: "#303740",
    900: "#1C2025",
  };

  const Textarea = styled(BaseTextareaAutosize)(
    ({ theme }) => `
    width: 300px;
    font-family: IBM Plex Sans, sans-serif;
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.5;
    padding: 8px 12px;
    border-radius: 8px;
    color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
    background: ${theme.palette.mode === "dark" ? grey[700] : "#F5F5F5"};
    border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
   

    &:hover {
        border-color: #000000;
    }

    &:focus {
        border-color: ${blue[400]};
    }

    // firefox
    &:focus-visible {
        outline: 0;
    }
`
  );

  return (
    <div>
      <textarea
        placeholder={placeholder}
        rows={3}
        onChange={onChange}
        value={value}
        className="w-[300px] text-sm font-normal leading-6 py-2 px-3 border-black/30 rounded-lg text-black bg-[#F5F5F5] border focus:border-blue-600 focus:border-2 focus:outline-none hover:border-black"
      />
    </div>
  );
}
