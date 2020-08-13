class Adm {
    static login(req, res) {
        res.render('loginadm');
    }

    static autenticar(app, req, res) {

        let connection = app.config.dbConnection(); // conexão com banco de dados
        let eventosModel = new app.app.models.EventosDAO(connection); // instanciando a classe com métodos referentes ao banco de dados
        eventosModel.getEventos((error, result) => { // Aqui usamos o método da classe para trazer todos os registros no banco de dados
            res.render('crudadm', { eventos: result });
        });
    }
}

module.exports = () => {
    return Adm;
}