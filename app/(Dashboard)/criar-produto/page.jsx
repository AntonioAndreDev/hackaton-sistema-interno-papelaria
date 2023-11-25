"use client";
import { useState } from "react";
import InputNumber from "@/app/components/InputNumber";
import InputText from "@/app/components/InputText";
import SelectTipoDeProduto from "@/app/components/SelectTipoDeProduto";
import Textarea from "@/app/components/Textarea";
import Title from "@/app/components/Title";

export default function CriarProduto() {
  const [nomeProduto, setNomeProduto] = useState("");
  const [tipoProduto, setTipoProduto] = useState("");
  const [descricaoProduto, setDescricaoProduto] = useState("");
  const [estoqueProduto, setEstoqueProduto] = useState("");
  const [imagemProduto, setImagemProduto] = useState("");
  const [valorProduto, setValorProduto] = useState("");

  const handleSubmit = () => {};

  return (
    <main>
      <h1 className="text-3xl mb-4">Adicione um novo produto</h1>
      <>
        <Title text={"Insira o nome do produto *"} />
        <InputText autoFocus={true} text={"Nome do Produto"} />
      </>

      <>
        <Title text={"Selecione o tipo do produto *"} />
        <SelectTipoDeProduto />
      </>

      <>
        <Title text={"Insira a descrição do produto *"} />
        <Textarea />
      </>

      <>
        <Title text={"Insira a quantidade em estoque do produto *"} />
        <InputNumber text={"Estoque do Produto"} />
      </>

      <>
        <Title text={"Insira o link da imagem do produto *"} />
        <InputText text={"URL da imagem"} />
      </>

      <>
        <Title text={"Insira o valor do produto *"} />
        <InputNumber text={"Valor do produto"} />
      </>
      <button onClick={handleSubmit}>Criar Produto</button>
    </main>
  );
}
