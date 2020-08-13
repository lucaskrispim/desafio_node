class Adm {
    static login(req, res) {
        res.render('loginadm',{ validacao: []});
    }

    static autenticar(app, req, res) {

        if (req.body.usuario == 'admin' && req.body.senha == 'admin') {
            req.session.autorizado = true;
            req.session.usuario = 'admin';
            req.session.senha = 'admin';
            let connection = app.config.dbConnection(); // conexão com banco de dados
            let eventosModel = new app.app.models.EventosDAO(connection); // instanciando a classe com métodos referentes ao banco de dados
            eventosModel.getEventos((error, result) => { // Aqui usamos o método da classe para trazer todos os registros no banco de dados
                res.render('crudadm', { eventos: result });
            });
        }else {
            console.log(req.body)
            res.render('loginadm',{ validacao: [{ msg: 'Este nome de usuário não está cadastrado no banco de dados!' }]});   
        }

    }
}

module.exports = () => {
    return Adm;
}