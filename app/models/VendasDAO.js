class VendasDAO{ // model de conexão, inserção e busca no banco de dados
    constructor(connection) {
        this.connection = connection;
    }
    finalizar(body,callback){
        this.connection.query('insert into vendas set ?',body,callback);
    }
}

module.exports = () => {
    return VendasDAO;
};