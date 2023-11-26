
### 💻 Sistema de Gerenciamento Interno de Produtos Para Papelarias

##

### Sobre a Aplicação

<p>Esse projeto foi desenvolvido com o objetivo principal de atender as necessidades internas de organizações relacionadas com o nicho de papelaria, voltada para questões de gerenciamento de produtos.</p>

##

### Tecnologias utilizadas:
* [Javascript](https://developer.mozilla.org/pt-BR/docs/web/javascript/guide/introduction): linguagem de programação
* [React](https://react.dev/): biblioteca Javascript
* [Nextjs](https://nextjs.org/): Framework React
* Outras: materialUI, nextUI, json, npm

##

### Features

* **Criar Conta:** crie um conta antes de acessar a aplicação.
* **Fazer Login:** após criar a sua conta, faça login.
* **Crie um Produto:** adicione um novo produto.
* **Veja os Produtos:** tenha a opção de visualizar todos os produtos cadastrados.

##

### Como executar:

### 1. Instale `Node` na sua máquina. Para isso acesse [esse link](https://nodejs.org/en/download)

### 2. Faça o clone [desse repositório](https://github.com/AntonioAndreDev/hackaton-sistema-interno-papelaria) na sua máquina:
* Crie uma pasta no seu computador para essa aplicação, nomeie essa pasta de acordo com sua preferência.
* Abra o `git bash` ou `terminal` dentro dessa pasta
* Copie a [URL](https://github.com/AntonioAndreDev/hackaton-sistema-interno-papelaria) do repositório
* Digite `git clone <URL do repositório copiada>` e pressione `enter`
* Abra o projeto clonado no seu editor de código fonte, eu recomendo o [Visual Studio Code](https://code.visualstudio.com/Download)

### 3. Instale as bibliotecas pelo terminal, dentro da pasta que foi criada:
* Execute o comando `npm install` para instalar todas as bibliotecas que foram utilizadas no projeto.

### 4. Inicie a aplicação no seu navegador por meio do terminal:
* Execute o comando `npm run dev` para inicializar a aplicação.
* Se não houver nenhum projeto sendo executado em desenvolvimento na sua máquina, a aplicação abrirá no endereço `http://localhost:3000/`, caso contrário, no terminal vai ser mostrado em qual endereço a aplicação está sendo executada.

##

### Registro (Cadastre-se)
### Para poder ter acesso à aplicação é necessário criar uma conta:
* **Inclua o nome e sobrenome:** esses campos devem possuir 3 ou mais palavras únicas. Exemplo de uso correto: `nome`: Antonio `sobrenome`: Andre
  Exemplo de uso incorreto: `nome`: Antonio Andre `sobrenome`: Sena Brilhante
* **Crie uma senha:** esse campo deve obedecer aos seguintes critérios: Possuir no mínimo uma letra maiúscula e uma letra minúscula, possuir no mínimo 1 número, possuir no mínimo 6 caracteres.

##

### Entrada (Login)
Ao criar uma conta, seu email será o seguinte: `nome`.`sobrenome`@papersaad.gov.br
Portanto, para seu login insira:
* **Email:** `nome`.`sobrenome`@papersaad.gov.br
* **Senha:** senha criada em `registro`

##

### Criando um produto
Para criar um novo produto basta acessar `Criar Produto` no menu lateral.
* **Nome do produto:** string
* **Tipo de produto:** string
* **Descrição do produto:** string
* **Estoque:** number
* **URL da imagem:** string
* **Valor do produto:** number
<br/>

**Exemplo de uso:**
  
* **Nome do produto:** 10 X Papel Cartolina Branca 150g 48x66
* **Tipo de produto:** Artigos de Papelaria
* **Descrição do produto:** Cartolina para trabalhos escolares e artesanato.
Produzido com materiais de qualidade, é excelente para dobrar, cortar, colar, escrever e estimular a criatividade.
Pacote com 10 unidades Branca
* **Estoque:** 197
* **URL da imagem:** [](https://a-static.mlcdn.com.br/800x560/cartolina-milenium-branca/centraldeembalagens/8739p/f86c44455ce7f911126f04030790515c.jpeg)https://a-static.mlcdn.com.br/800x560/cartolina-milenium-branca/centraldeembalagens/8739p/f86c44455ce7f911126f04030790515c.jpeg
* **Valor do produto:** 15,50

##

### Visualizando os produtos
Para ver a lista de todos os produtos acesse `Ver Produtos` no menu lateral. <br/>
**Caso não veja nenhum produto, mesmo que tenha criado um, clique em** `Atualizar Lista de Produtos`.
Feito isso, será possível ver todos os produtos cadastrados. Além disso, há opções de filtragem da tabela que contem a lista de produtos:
* **Tipo de Produto:** realize a filtragem dos produtos pelo seu tipo
* **Nome do Produto:** realiza a filtragem dos produtos pesquisando pelo seu nome

**Tenha a opção de mostrar mais detalhes dos produtos controlando as colunas que deseja visualizar:**
* ID
* Nome
* Tipo de produto
* Ações

##

### Ações
Em `Ver Produtos` existe uma opção chamada `ações`, a partir dessa coluna existem algumas opções:
* **Visualizar:** visualize todas as informações do produto específico que foi acessado
* **Editar:** edite os dados do produto específico que foi selecionado
* **Deletar:** delete o produto que foi selecionado da lista de produtos
