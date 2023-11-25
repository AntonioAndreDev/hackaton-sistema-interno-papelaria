"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function EditarProduto({ params }) {
  useEffect(() => {
    if (typeof window !== "undefined") {
      const produtos = JSON.parse(localStorage.getItem("produtos"));
      const produto = produtos.find((produto) => produto.id === params.id);
      console.log(produto);
    }
  });
  return (
    <div>
      <a href="/lista-de-produtos">Voltar</a>
      <h1>Editar Produto</h1>
    </div>
  );
}
