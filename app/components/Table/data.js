const columns = [
  { name: "ID", uid: "id", sortable: true },
  { name: "NOME", uid: "name", sortable: true },
  { name: "TIPO DE PRODUTO", uid: "tipoDeProduto", sortable: true },
  { name: "AÇÕES", uid: "actions" },
];

const opcoesDeTipo = [
  { name: "artigos de papelaria", uid: "artigos de papelaria" },
  { name: "material escolar", uid: "material escolar" },
  { name: "material técnico", uid: "material técnico" },
];

const produtos = [];
const produtosPDF = [];

if (typeof window !== "undefined") {
  const produtosJson = JSON.parse(localStorage.getItem("produtos"));

  for (let i = 0; i < produtosJson?.length; i++) {
    const novoProduto = {
      id: produtosJson[i].id,
      name: produtosJson[i].name,
      tipoDeProduto: produtosJson[i].tipoDeProduto.toLowerCase(),
      avatar: produtosJson[i].imagem,
      estoque: produtosJson[i].estoque,
    };

    produtos.push(novoProduto);
    produtosPDF.push(novoProduto);
  }
}

export { columns, produtos, opcoesDeTipo, produtosPDF };
