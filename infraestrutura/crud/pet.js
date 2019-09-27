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
    const sql = `SELECT * FROM Pets WHERE id=${parseInt(id)}`;
    return executaQuery(sql);
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

    const sql = `UPDATE Pets SET nome='${nome}', donoId=${donoId}, tipo='${tipo}', observacoes='${observacoes}' WHERE id=${id}`;

    return executaQuery(sql);
  }

  deleta(id) {
    const sql = `DELETE FROM Pets WHERE id=${id}`;

    return executaQuery(sql);
  }
}

module.exports = new Pet();
