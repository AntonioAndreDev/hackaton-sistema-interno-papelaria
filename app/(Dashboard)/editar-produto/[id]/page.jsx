"use client";

import { useEffect } from "react";

export default function EditarProduto({ params }) {
  useEffect(() => {
    if (typeof window !== "undefined") {
      const produtos = JSON.parse(localStorage.getItem("produtos"));
    }
  });
  return <div></div>;
}
