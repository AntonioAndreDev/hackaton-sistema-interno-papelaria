import Link from "next/link";

export default function ListaDeProdutos() {
  return (
    <div>
      <h1>Lista de produtos</h1>
      <Link href={"/dashboard"}>Menu Principal</Link>
    </div>
  );
}
