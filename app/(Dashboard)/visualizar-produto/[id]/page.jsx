"use client";
import { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Image,
  Skeleton,
} from "@nextui-org/react";
import Copy from "@/app/components/Copy";

export default function VisualizarProduto({ params }) {
  const [produto, setProduto] = useState("");
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const produtos = JSON.parse(localStorage.getItem("produtos"));
    const produto = produtos.find((item) => item.id === params.id);
    setProduto(produto);
    setCarregando(false);
  }, []);

  console.log(produto);

  return (
    <main className="mt-12 mx-auto flex flex-col">
      <h1 className="text-center text-xl mb-4">
        {carregando ? (
          <Skeleton className="w-[400px] rounded-lg">
            <div className="h-3 w-[400px] rounded-lg bg-default-200"></div>
          </Skeleton>
        ) : (
          `Detalhes do Produto: ${produto.name}`
        )}
      </h1>
      <Card className="max-w-[400px]">
        <CardHeader className="flex gap-3">
          {carregando && (
            <Skeleton className="w-16 h-16 rounded-lg">
              <div className="h-16 w-16 rounded-lg bg-default-200"></div>
            </Skeleton>
          )}
          <Image
            className="w-16"
            alt="nextui logo"
            height={200}
            width={200}
            radius="sm"
            src={produto.imagem}
          />
          <div className="flex flex-col">
            {carregando ? (
              <div className="flex flex-col gap-2">
                <Skeleton className="h-3 w-[200px] rounded-lg">
                  <div className="h-3 w-[200px] rounded-lg bg-default-200"></div>
                </Skeleton>
                <Skeleton className="h-3 w-[200px] rounded-lg">
                  <div className="h-3 w-[200px] rounded-lg bg-default-200"></div>
                </Skeleton>
              </div>
            ) : (
              <>
                <p className="text-md font-medium">{produto.name}</p>
                <p className="text-small text-default-500">{produto.tipoDeProduto}</p>
              </>
            )}
          </div>
        </CardHeader>
        <Divider />
        <CardBody>
          {carregando ? (
            <div className="flex flex-col gap-2">
              <Skeleton className="w-[350px] rounded-lg">
                <div className="h-3 w-[350px] rounded-lg bg-default-200"></div>
              </Skeleton>
              <Skeleton className="w-[350px] rounded-lg">
                <div className="h-3 w-[350px] rounded-lg bg-default-200"></div>
              </Skeleton>
            </div>
          ) : (
            `${produto.descricao}`
          )}
        </CardBody>
        <CardBody>
          {carregando ? (
            <div className="flex flex-col gap-2">
              <Skeleton className="w-[180px] rounded-lg">
                <div className="h-3 w-[180px] rounded-lg bg-default-200"></div>
              </Skeleton>
            </div>
          ) : (
            `${produto.estoque} unidades em estoque.`
          )}
        </CardBody>
        <CardBody>
          {carregando ? (
            <div className="flex flex-col gap-2">
              <Skeleton className="w-[130px] rounded-lg">
                <div className="h-3 w-[130px] rounded-lg bg-default-200"></div>
              </Skeleton>
            </div>
          ) : (
            `R$${produto.valor}`
          )}
        </CardBody>
        <Divider />
        <CardFooter>
          {carregando ? (
            <div className="flex flex-col gap-2 mx-auto">
              <Skeleton className="w-[380px] rounded-lg">
                <div className="h-3 w-[380px] rounded-lg bg-default-200"></div>
              </Skeleton>
            </div>
          ) : (
            <Copy textToCopy={produto.id} />
          )}
        </CardFooter>
      </Card>
    </main>
  );
}
