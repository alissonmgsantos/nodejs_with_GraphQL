const { GraphQLServer } = require("graphql-yoga");
const conexao = require("./infraestrutura/conexao");
const Tabelas = require("./infraestrutura/database/tabelas");
const Operations = require("./infraestrutura/operations");

const Clientes = new Operations("cliente");
const Pets = new Operations("pet");
conexao.connect(erro => {
  if (erro) {
    console.log(erro);
  }

  console.log("conectou no banco");

  Tabelas.init(conexao);
});

const resolvers = {
  Query: {
    status: () => "Servidor rodando",
    clientes: () => Clientes.lista(),
    cliente: (root, { id }) => Clientes.buscaPorId(id),
    pets: () => Pets.lista(),
    pet: (root, { id }) => Pets.buscaPorId(id)
  },
  Mutation: {
    adicionarCliente: (root, params) => Clientes.adiciona(params),
    atualizarCliente: (root, params) => Clientes.atualiza(params),
    deletarCliente: (root, { id }) => Clientes.deleta(id),
    adicionarPet: (root, params) => Pets.adiciona(params),
    atualizarPet: (root, params) => Pets.atualiza(params),
    deletarPet: (root, { id }) => Pets.deleta(id)
  }
};
const server = new GraphQLServer({
  resolvers: resolvers,
  typeDefs: "./schema.graphql"
});

server.start(() => console.log("Servidor ouvindo"));
