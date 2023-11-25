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

if (typeof window !== "undefined") {
  window.addEventListener("load", () => {
    const produtosJson = JSON.parse(localStorage.getItem("produtos"));

    console.log(produtos);

    for (let i = 0; i < produtosJson?.length; i++) {
      const novoProduto = {
        id: produtosJson[i].id,
        name: produtosJson[i].name,
        tipoDeProduto: produtosJson[i].tipoDeProduto.toLowerCase(),
        avatar: produtosJson[i].imagem,
      };

      produtos.push(novoProduto);
    }
  });
}

export { columns, produtos, opcoesDeTipo };
