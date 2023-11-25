"use client";
import { useEffect, useState } from "react";
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
  const [camposValidos, setCamposValidos] = useState(false);

  function validarCampos() {
    if (
      nomeProduto.length > 0 &&
      tipoProduto.length > 0 &&
      descricaoProduto.length > 0 &&
      estoqueProduto.length > 0 &&
      imagemProduto.length > 0 &&
      valorProduto.length > 0
    ) {
      setCamposValidos(true);
    } else {
      setCamposValidos(false);
    }
  }

  useEffect(() => {
    validarCampos();
  }, [
    nomeProduto,
    tipoProduto,
    descricaoProduto,
    estoqueProduto,
    imagemProduto,
    valorProduto,
  ]);

  const handleSubmit = () => {
    console.log(camposValidos);
  };

  return (
    <main>
      <h1 className="text-3xl mb-4">Adicione um novo produto</h1>
      <>
        <Title text={"Insira o nome do produto *"} />
        <InputText
          onChange={(ev) => setNomeProduto(ev.target.value)}
          value={nomeProduto}
          autoFocus={true}
          text={"Nome do Produto"}
        />
      </>

      <>
        <Title text={"Selecione o tipo do produto *"} />
        <SelectTipoDeProduto
          onChange={(ev) => setTipoProduto(ev.target.value)}
          value={tipoProduto}
        />
      </>

      <>
        <Title text={"Insira a descrição do produto *"} />
        <Textarea
          onChange={(ev) => setDescricaoProduto(ev.target.value)}
          value={descricaoProduto}
        />
      </>

      <>
        <Title text={"Insira a quantidade em estoque do produto *"} />
        <InputNumber
          onChange={(ev) => setEstoqueProduto(ev.target.value)}
          value={estoqueProduto}
          text={"Estoque do Produto"}
        />
      </>

      <>
        <Title text={"Insira o link da imagem do produto *"} />
        <InputText
          onChange={(ev) => setImagemProduto(ev.target.value)}
          value={imagemProduto}
          text={"URL da imagem"}
        />
      </>

      <>
        <Title text={"Insira o valor do produto *"} />
        <InputNumber
          onChange={(ev) => setValorProduto(ev.target.value)}
          value={valorProduto}
          text={"Valor do produto"}
        />
      </>
      <button onClick={handleSubmit}>Criar Produto</button>
    </main>
  );
}
