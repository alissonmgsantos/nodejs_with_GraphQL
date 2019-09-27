const executaQuery = require("../database/queries");

class Pet {
  lista() {
    const sql =
      "SELECT p.*, c.id AS donoId,  c.nome as donoNome, c.cpf as donoCPF FROM Pets p INNER JOIN CLIENTES c ON c.id = p.donoId";
    return executaQuery(sql).then(response =>
      response.map(pet => ({
        id: pet.id,
        nome: pet.nome,
        tipo: pet.tipo,
        observacoes: pet.observacoes,
        dono: {
          id: pet.donoId,
          nome: pet.donoNome,
          cpf: pet.donoCpf
        }
      }))
    );
  }

  buscaPorId(id) {
    const sql = `SELECT p.id, p.nome, p.tipo, p.observacoes, c.id AS donoId, c.nome AS donoNome, c.cpf AS donoCpf FROM Pets p INNER JOIN Clientes c ON c.id = p.donoId WHERE p.id =${parseInt(
      id
    )}`;

    return executaQuery(sql).then(pets => ({
      id: pets[0].id,
      nome: pets[0].nome,
      tipo: pets[0].tipo,
      observacoes: pets[0].observacoes,
      dono: {
        id: pets[0].donoId,
        nome: pets[0].donoNome,
        cpf: pets[0].donoCpf
      }
    }));
  }

  adiciona(item) {
    const { nome, donoId, tipo, observacoes } = item;
    const sql = `INSERT INTO Pets(nome, donoId, tipo, observacoes) VALUES('${nome}', ${donoId}, '${tipo}', '${observacoes}')`;
    return executaQuery(sql).then(response => ({
      id: response.insertId,
      nome: nome,
      donoId: donoId,
      tipo: tipo,
      observacoes: observacoes
    }));
  }

  atualiza(novoItem) {
    const { id, nome, donoId, tipo, observacoes } = novoItem;
    const sql = `UPDATE Pets SET nome='${nome}', donoId=${donoId}, tipo='${tipo}', observacoes='${observacoes}' WHERE id=${id}; SELECT * FROM Clientes WHERE id=${donoId}`;
    return executaQuery(sql).then(dados => {
      const dono = dados[1][0];

      return {
        ...novoItem,
        dono
      };
    });
  }

  deleta(id) {
    const sql = `DELETE FROM Pets WHERE id=${id}`;
    return executaQuery(sql).then(() => id);
  }
}

module.exports = new Pet();
