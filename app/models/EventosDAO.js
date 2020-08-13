class EventosDAO{ // model de conexão, inserção e busca no banco de dados
    constructor(connection) {
        this.connection = connection;
    }
    getEventos(callback){
        this.connection.query("SELECT *,date_format(data,'%d/%m/%Y') as data_formatada FROM eventos order by data",callback);
    };

}

module.exports = () => {
    return EventosDAO;
};