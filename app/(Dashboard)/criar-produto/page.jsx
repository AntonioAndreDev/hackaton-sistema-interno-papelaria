"use client";
import React from "react";
import { useEffect, useState } from "react";
import InputNumber from "@/app/components/InputNumber";
import InputText from "@/app/components/InputText";
import SelectTipoDeProduto from "@/app/components/SelectTipoDeProduto";
import Textarea from "@/app/components/Textarea";
import Title from "@/app/components/Title";
import ButtonComponent from "@/app/components/ButtonComponent";
import { v4 as uuidv4 } from "uuid";
import { Toaster, toast } from "sonner";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";

export default function CriarProduto() {
  const [nomeProduto, setNomeProduto] = useState("");
  const [tipoProduto, setTipoProduto] = useState("");
  const [descricaoProduto, setDescricaoProduto] = useState("");
  const [estoqueProduto, setEstoqueProduto] = useState("");
  const [imagemProduto, setImagemProduto] = useState("");
  const [valorProduto, setValorProduto] = useState("");
  const [camposValidos, setCamposValidos] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [backdrop, setBackdrop] = React.useState("opaque");

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

  const handleOpen = (backdrop) => {
    setBackdrop(backdrop);
    onOpen();
  };

  const handleConfirmModal = () => {
    const produtos = JSON.parse(localStorage.getItem("produtos")) || [];
    const produtoExistente = produtos.find((item) => item.name === nomeProduto);
    if (produtoExistente) {
      toast.warning("Produto já existe!");
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
    toast.success("Produto criado com sucesso!");
    setNomeProduto("");
    setTipoProduto("");
    setDescricaoProduto("");
    setEstoqueProduto("");
    setImagemProduto("");
    setValorProduto("");
  };

  const handleCancelModal = () => {
    toast.warning("Produto não criado!");
  };

  const handleSubmit = () => {
    if (camposValidos) {
      handleOpen("blur");
    } else {
      toast.warning("Preencha todos os campos!");
    }
  };

  return (
    <main>
      <h1 className="text-3xl mb-4">Adicione um novo produto</h1>
      <div className="grid grid-cols-2">
        <div>
          <>
            <Title text={"Insira o nome do produto *"} />
            <InputText
              onChange={(ev) => setNomeProduto(ev.target.value)}
              value={nomeProduto}
              autoFocus={true}
              text={"Nome do Produto"}
            />
            {nomeProduto.length === 0 && (
              <p className="text-xs font-medium italic mb-4 text-red-400">
                Nome do produto é obrigatório
              </p>
            )}
          </>

          <>
            <Title text={"Selecione o tipo do produto *"} />
            <SelectTipoDeProduto
              onChange={(ev) => setTipoProduto(ev.target.value)}
              value={tipoProduto}
            />
            {tipoProduto.length === 0 && (
              <p className="text-xs font-medium italic mb-4 text-red-400">
                Tipo do produto é obrigatório
              </p>
            )}
          </>

          <>
            <Title text={"Insira a descrição do produto *"} />
            <Textarea
              onChange={(ev) => setDescricaoProduto(ev.target.value)}
              value={descricaoProduto}
            />
            {descricaoProduto.length === 0 && (
              <p className="text-xs font-medium italic mb-4 text-red-400">
                Descrição do produto é obrigatório
              </p>
            )}
          </>
        </div>
        <div>
          <>
            <Title text={"Insira a quantidade em estoque do produto *"} />
            <InputNumber
              onChange={(ev) => setEstoqueProduto(ev.target.value)}
              value={estoqueProduto}
              text={"Estoque do Produto"}
            />
            {estoqueProduto.length === 0 && (
              <p className="text-xs font-medium italic mb-4 text-red-400">
                Estoque do produto é obrigatório
              </p>
            )}
          </>

          <>
            <Title text={"Insira o link da imagem do produto *"} />
            <InputText
              onChange={(ev) => setImagemProduto(ev.target.value)}
              value={imagemProduto}
              text={"URL da imagem"}
            />
            {imagemProduto.length === 0 && (
              <p className="text-xs font-medium italic mb-4 text-red-400">
                Imagem do produto é obrigatório
              </p>
            )}
          </>

          <>
            <Title text={"Insira o valor do produto *"} />
            <InputNumber
              onChange={(ev) => setValorProduto(ev.target.value)}
              value={valorProduto}
              text={"Valor do produto"}
            />
            {valorProduto.length === 0 && (
              <p className="text-xs font-medium italic mb-4 text-red-400">
                Valor do produto é obrigatório
              </p>
            )}
          </>
        </div>
      </div>

      <ButtonComponent onClick={handleSubmit} text={"Criar Produto"} />
      <Modal backdrop={backdrop} isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Deseja criar o produto abaixo?
              </ModalHeader>
              <ModalBody>
                <p>
                  <strong>Nome: </strong>
                  {nomeProduto}
                </p>
                <p>
                  <strong>Tipo: </strong>
                  {tipoProduto}
                </p>
                <p>
                  <strong>Descrição: </strong>
                  {descricaoProduto}
                </p>
                <p>
                  <strong>Estoque: </strong> {estoqueProduto}
                </p>
                <p>
                  <strong>Imagem: </strong>
                  <img
                    className="w-1/4 rounded-md"
                    src={imagemProduto}
                    alt={`Imagem de ${nomeProduto}`}
                  />
                </p>
                <p>
                  <strong>Valor: </strong>
                  R${valorProduto}
                </p>
              </ModalBody>
              <ModalFooter>
                <Button
                  onClick={handleCancelModal}
                  color="danger"
                  variant="light"
                  onPress={onClose}
                >
                  Cancelar
                </Button>
                <Button onClick={handleConfirmModal} color="primary" onPress={onClose}>
                  Confirmar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <Toaster position="top-center" />
    </main>
  );
}
