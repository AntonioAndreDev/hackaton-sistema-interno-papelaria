import Input from "@/app/components/Input";
import SelectTipoDeProduto from "@/app/components/SelectTipoDeProduto";
import Title from "@/app/components/Title";

export default function CriarProduto() {
  return (
    <main>
      <h1 className="text-3xl mb-4">Adicione um novo produto</h1>
      <>
        <Title text={"Selecione o tipo do produto*"} />
        <SelectTipoDeProduto />
      </>

      <>
        <Title text={"Insira o nome do produto"} />
        <Input text={"Nome do Produto"} />
      </>
    </main>
  );
}
