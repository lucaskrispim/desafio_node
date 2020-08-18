class UserDAO{ // model de conexão, inserção e busca no banco de dados
    constructor(connection) {
        this.connection = connection;
    }
    getUser(nome,callback){
        this.connection.query("SELECT * FROM cliente where username = ?",nome,callback);
    };
    createUser(body,callback){
        this.connection.query('insert into cliente set ?',body,callback);
    }
}

module.exports = () => {
    return UserDAO;
};