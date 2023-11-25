"use client";

import ButtonComponent from "@/app/components/ButtonComponent";
import InputNumber from "@/app/components/InputNumber";
import InputText from "@/app/components/InputText";
import SelectTipoDeProduto from "@/app/components/SelectTipoDeProduto";
import Textarea from "@/app/components/Textarea";
import Title from "@/app/components/Title";
import { useEffect, useState } from "react";

export default function EditarProduto({ params }) {
  const [nomeProduto, setNomeProduto] = useState("");
  const [tipoProduto, setTipoProduto] = useState("");
  const [descricaoProduto, setDescricaoProduto] = useState("");
  const [estoqueProduto, setEstoqueProduto] = useState("");
  const [imagemProduto, setImagemProduto] = useState("");
  const [valorProduto, setValorProduto] = useState("");
  const [camposValidos, setCamposValidos] = useState(false);
  const [produto, setProduto] = useState([]);

  useEffect(() => {
    const produtos = JSON.parse(localStorage.getItem("produtos"));
    const produto = produtos.find((produto) => produto.id === params.id);
    setProduto(produto);
  }, []);

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
  }, [nomeProduto, tipoProduto, descricaoProduto, estoqueProduto, imagemProduto, valorProduto]);

  const handleSubmit = () => {
    if (camposValidos) {
      const confirmarCriacao = confirm(
        `Deseja criar o seguinte produto? \n Nome: ${nomeProduto} \n Tipo: ${tipoProduto} \n Descrição: ${descricaoProduto} \n Estoque: ${estoqueProduto} \n Imagem: ${imagemProduto} \n Valor: ${valorProduto}`
      );

      if (confirmarCriacao) {
        const produtos = JSON.parse(localStorage.getItem("produtos")) || [];
        const produtoExistente = produtos.find((item) => item.name === nomeProduto);

        if (produtoExistente) {
          alert("Produto já existe!");
          return;
        }

        const produto = {
          id: uuidv4(),
          name: nomeProduto,
          tipoDeProduto: tipoProduto,
          descricao: descricaoProduto,
          estoque: estoqueProduto,
          imagem: imagemProduto,
          valor: valorProduto,
        };

        produtos.push(produto);
        localStorage.setItem("produtos", JSON.stringify(produtos));
      } else {
        alert("Produto não criado!");
      }
    } else {
      alert("Preencha todos os campos!");
    }
  };

  return (
    <div>
      <a href="/lista-de-produtos">Voltar</a>
      <div className="border border-black/50 rounded-md p-4 mb-8">
        <h1 className="text-3xl mb-2">Editar produto</h1>
        <img src={produto.imagem} className="w-1/6" alt="" />
        <div className="flex gap-1">
          <strong>Nome:</strong> <h5>{produto.name}</h5> <br />
        </div>
        <div className="flex gap-1">
          <strong>Tipo:</strong> <h5>{produto.tipoDeProduto}</h5> <br />
        </div>
        <div className="flex gap-1">
          <strong>Descrição:</strong> <h5>{produto.descricao}</h5> <br />
        </div>
        <div className="flex gap-1">
          <strong>Estoque:</strong> <h5>{produto.estoque}</h5> <br />
        </div>
        <div className="flex gap-1">
          <strong>Valor:</strong> <h5>{produto.valor}</h5> <br />
        </div>
      </div>

      <main>
        <>
          <Title text={"Insira o nome do produto"} />
          <InputText
            required={false}
            onChange={(ev) => setNomeProduto(ev.target.value)}
            value={nomeProduto}
            autoFocus={true}
            text={"Nome do Produto"}
          />
        </>

        <>
          <Title text={"Selecione o tipo do produto"} />
          <SelectTipoDeProduto
            required={false}
            onChange={(ev) => setTipoProduto(ev.target.value)}
            value={tipoProduto}
          />
        </>

        <>
          <Title text={"Insira a descrição do produto"} />
          <Textarea
            placeholder={"Descrição do produto"}
            onChange={(ev) => setDescricaoProduto(ev.target.value)}
            value={descricaoProduto}
          />
        </>

        <>
          <Title text={"Insira a quantidade em estoque do produto"} />
          <InputNumber
            required={false}
            onChange={(ev) => setEstoqueProduto(ev.target.value)}
            value={estoqueProduto}
            text={"Estoque do Produto"}
          />
        </>

        <>
          <Title text={"Insira o link da imagem do produto"} />
          <InputText
            required={false}
            onChange={(ev) => setImagemProduto(ev.target.value)}
            value={imagemProduto}
            text={"URL da imagem"}
          />
        </>

        <>
          <Title text={"Insira o valor do produto"} />
          <InputNumber
            required={false}
            onChange={(ev) => setValorProduto(ev.target.value)}
            value={valorProduto}
            text={"Valor do produto"}
          />
        </>
        <ButtonComponent onClick={handleSubmit} text={"Editar Produto"} />
      </main>
    </div>
  );
}
