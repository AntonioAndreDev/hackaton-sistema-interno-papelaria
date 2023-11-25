"use client";
import { useEffect, useState } from "react";

export default function VisualizarProduto({ params }) {
  const [produto, setProduto] = useState("");

  useEffect(() => {
    const produtos = JSON.parse(localStorage.getItem("produtos"));
    const produto = produtos.find((item) => item.id === params.id);
    setProduto(produto);
  }, []);

  console.log(produto);

  return (
    <main>
      <h1></h1>
    </main>
  );
}
