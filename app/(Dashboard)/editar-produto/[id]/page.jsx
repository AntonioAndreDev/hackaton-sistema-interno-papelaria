"use client";

import ButtonComponent from "@/app/components/ButtonComponent";
import Copy from "@/app/components/Copy";
import InputNumber from "@/app/components/InputNumber";
import InputText from "@/app/components/InputText";
import SelectTipoDeProduto from "@/app/components/SelectTipoDeProduto";
import Textarea from "@/app/components/Textarea";
import Title from "@/app/components/Title";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Image,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Skeleton,
  useDisclosure,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import { toast, Toaster } from "sonner";

export default function EditarProduto({ params }) {
  const [nomeProduto, setNomeProduto] = useState("");
  const [tipoProduto, setTipoProduto] = useState("");
  const [descricaoProduto, setDescricaoProduto] = useState("");
  const [estoqueProduto, setEstoqueProduto] = useState("");
  const [imagemProduto, setImagemProduto] = useState("");
  const [valorProduto, setValorProduto] = useState("");
  const [camposValidos, setCamposValidos] = useState(false);
  const [produto, setProduto] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [backdrop, setBackdrop] = useState("opaque");
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const produtos = JSON.parse(localStorage.getItem("produtos"));
    const produto = produtos.find((produto) => produto.id === params.id);
    setProduto(produto);
    setCarregando(false);
  }, []);

  function validarCampos() {
    if (
      nomeProduto.length > 0 ||
      tipoProduto.length > 0 ||
      descricaoProduto.length > 0 ||
      estoqueProduto.length > 0 ||
      imagemProduto.length > 0 ||
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

  const handleCancelModal = () => {
    toast.warning("Produto não editado!");
  };

  const handleConfirmModal = () => {
    const produtos = JSON.parse(localStorage.getItem("produtos"));
    const produtoIndex = produtos.findIndex((p) => p.id === params.id);

    const updatedProduto = {
      ...produto,
      name: nomeProduto || produto.name,
      tipoDeProduto: tipoProduto || produto.tipoDeProduto,
      descricao: descricaoProduto || produto.descricao,
      estoque: estoqueProduto || produto.estoque,
      imagem: imagemProduto || produto.imagem,
      valor: valorProduto || produto.valor,
    };
    produtos[produtoIndex] = updatedProduto;
    localStorage.setItem("produtos", JSON.stringify(produtos));
    setProduto(updatedProduto);
    toast.success("Produto editado com sucesso!");
  };

  const handleSubmit = () => {
    if (camposValidos) {
      handleOpen("opaque");
    } else {
      toast.warning("Edite pelo um campo!");
    }
  };

  return (
    <div>
      <div>
        <h1 className="text-xl mb-4">
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
      </div>

      <main>
        <div className="grid grid-cols-2">
          <div>
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
          </div>
          <div>
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
          </div>
        </div>

        <ButtonComponent onClick={handleSubmit} text={"Editar Produto"} />
        <Modal backdrop={backdrop} isOpen={isOpen} onClose={onClose}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Deseja editar o(s) campo(s) abaixo?
                </ModalHeader>
                <ModalBody>
                  {nomeProduto.length > 0 && (
                    <p>
                      <strong>Nome: </strong>
                      {nomeProduto}
                    </p>
                  )}
                  {tipoProduto.length > 0 && (
                    <p>
                      <strong>Tipo: </strong>
                      {tipoProduto}
                    </p>
                  )}
                  {descricaoProduto.length > 0 && (
                    <p>
                      <strong>Descrição: </strong>
                      {descricaoProduto}
                    </p>
                  )}
                  {estoqueProduto.length > 0 && (
                    <p>
                      <strong>Estoque: </strong>
                      {estoqueProduto}
                    </p>
                  )}
                  {imagemProduto.length > 0 && (
                    <p>
                      <strong>Imagem: </strong>
                      {imagemProduto}
                    </p>
                  )}
                  {valorProduto.length > 0 && (
                    <p>
                      <strong>Valor: </strong>
                      {valorProduto}
                    </p>
                  )}
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
    </div>
  );
}
