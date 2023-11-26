"use client";
import { useEffect, useState } from "react";
import { Card, CardHeader, CardBody, CardFooter, Divider, Link, Image } from "@nextui-org/react";

export default function VisualizarProduto({ params }) {
  const [produto, setProduto] = useState("");

  useEffect(() => {
    const produtos = JSON.parse(localStorage.getItem("produtos"));
    const produto = produtos.find((item) => item.id === params.id);
    setProduto(produto);
  }, []);

  console.log(produto);

  return (
    <main className="mt-12 mx-auto">
      <h1 className="text-center text-xl mb-4">Detalhes do Produto: {produto.name}</h1>
      <Card className="max-w-[400px]">
        <CardHeader className="flex gap-3">
          <Image
            className="w-16"
            alt="nextui logo"
            height={200}
            width={200}
            radius="sm"
            src={produto.imagem}
          />
          <div className="flex flex-col">
            <p className="text-md font-medium">{produto.name}</p>
            <p className="text-small text-default-500">{produto.tipoDeProduto}</p>
          </div>
        </CardHeader>
        <Divider />
        <CardBody>
          <p>{produto.descricao}</p>
        </CardBody>
        <CardBody>
          <p>{produto.estoque} unidades.</p>
        </CardBody>
        <CardBody>
          <p>R${produto.valor}</p>
        </CardBody>
        <Divider />
      </Card>
    </main>
  );
}
