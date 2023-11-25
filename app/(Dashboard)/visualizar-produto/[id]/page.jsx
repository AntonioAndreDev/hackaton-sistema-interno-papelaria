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
      <img className="w-1/4" src={produto.imagem} alt={`Imagem de ${produto.name}`} />
      <h1>
        <strong>Nome:</strong> {produto.name}
      </h1>
      <h6>
        <strong>Estoque:</strong> {produto.estoque}
      </h6>
      <h6>
        <strong>Valor:</strong> R${produto.valor}
      </h6>
      <h6>
        <strong>Tipo:</strong> {produto.tipoDeProduto}
      </h6>
      <h6>
        <strong>Descrição:</strong> {produto.descricao}
      </h6>
    </main>
  );
}
