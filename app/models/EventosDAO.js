class EventosDAO{ // model de conexão, inserção e busca no banco de dados
    constructor(connection) {
        this.connection = connection;
    }
    getEventos(callback){
        this.connection.query("SELECT *,date_format(data,'%d/%m/%Y') as data_formatada FROM eventos order by data",callback);
    };
    getEventosW(id,callback){
        this.connection.query("SELECT *,date_format(data,'%d/%m/%Y') as data_formatada FROM eventos where id !=? order by data",[id],callback);
    };
    excluirEventos(id,callback){
        this.connection.query("delete from eventos where id=?",[id],callback);
    }
    getEvento(id,callback){
        this.connection.query("SELECT *,date_format(data,'%d/%m/%Y') as data_formatada from eventos where id=?",[id],callback);
    }
    updateEvento(body,callback){
        this.connection.query("update eventos set nome=?,data=?,local=?,valor=?,ingressos_disp=?,empresa=? where id=?",[body.nome,body.data_formatada,body.local,body.valor,body.ingressos_disp,body.empresa,body.id],callback);
    }
    updateIngressos(body,callback){

        this.connection.query("update eventos set ingressos_disp=? where id=?",[body.ingressos_disp,body.id],callback);
    }
    criarEvento(body,callback){
        this.connection.query('insert into eventos set ?',body,callback);
    }

}

module.exports = () => {
    return EventosDAO;
};