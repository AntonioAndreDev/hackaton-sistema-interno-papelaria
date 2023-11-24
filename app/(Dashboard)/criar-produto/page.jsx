import SelectTipoDeProduto from "@/app/components/SelectTipoDeProduto";

export default function CriarProduto() {
  return (
    <main>
      <h1 className="text-3xl mb-4">Adicione um novo produto</h1>
      <SelectTipoDeProduto />
    </main>
  );
}
