import Link from "next/link";

export default function Dashboard() {
  return (
    <div>
      <h1>Menu Principal</h1>
      <Link href={"/criar-produto"}>Criar Produto</Link> <br />
      <Link href={"/lista-de-produtos"}>Lista de Produtos</Link>
    </div>
  );
}
