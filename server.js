const { GraphQLServer } = require("graphql-yoga");
const conexao = require("./infraestrutura/conexao");
const Tabelas = require("./infraestrutura/database/tabelas");

conexao.connect(erro => {
  if (erro) {
    console.log(erro);
  }

  console.log("conectou no banco");

  Tabelas.init(conexao);
});

const resolvers = {
  Query: {
    status: () => "Servidor rodando"
  }
};
const server = new GraphQLServer({
  resolvers: resolvers,
  typeDefs: "./schema.graphql"
});

server.start(() => console.log("Servidor ouvindo"));
