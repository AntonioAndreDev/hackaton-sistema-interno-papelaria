import Link from "next/link";

export default function CriarProduto() {
  return (
    <div>
      <h1>Criar produto</h1>
      <Link href={"/dashboard"}>Menu Principal</Link>
    </div>
  );
}
