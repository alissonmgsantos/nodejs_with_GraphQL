const { GraphQLServer } = require("graphql-yoga");
const conexao = require("./infraestrutura/conexao");
const Tabelas = require("./infraestrutura/database/tabelas");
const Operations = require("./infraestrutura/operations");

const Clientes = new Operations("cliente");
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
    cliente: (root, { id }) => Clientes.buscaPorId(id)
  },
  Mutation: {
    adicionarCliente: (root, params) => Clientes.adiciona(params)
  }
};
const server = new GraphQLServer({
  resolvers: resolvers,
  typeDefs: "./schema.graphql"
});

server.start(() => console.log("Servidor ouvindo"));
