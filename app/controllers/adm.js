class Adm {
    static login(app, req, res) {
        if (!req.session.autorizado) {
            res.render('loginadm', { validacao: [] });
        } else {
            let connection = app.config.dbConnection(); // conexão com banco de dados
            let eventosModel = new app.app.models.EventosDAO(connection); // instanciando a classe com métodos referentes ao banco de dados
            eventosModel.getEventos((error, result) => { // Aqui usamos o método da classe para trazer todos os registros no banco de dados
                res.render('crudadm', { eventos: result, validacao: [] });
            });
        }

    }

    static logout(app, req, res) {
        if (!req.session.autorizado) {
            res.render('loginadm', { validacao: [] });
        } else {
            req.session.autorizado = false;
            req.session.usuario = '';
            req.session.senha = '';
            res.redirect('/');
        }
    }


    static autenticar(app, req, res) {

        if (!req.session.autorizado) {
            if (req.body.usuario == 'admin' && req.body.senha == 'admin') {
                req.session.autorizado = true;
                req.session.usuario = 'admin';
                req.session.senha = 'admin';
                let connection = app.config.dbConnection(); // conexão com banco de dados
                let eventosModel = new app.app.models.EventosDAO(connection); // instanciando a classe com métodos referentes ao banco de dados
                eventosModel.getEventos((error, result) => { // Aqui usamos o método da classe para trazer todos os registros no banco de dados
                    res.render('crudadm', { eventos: result, validacao: [] });
                });
            } else {
                res.render('loginadm', { validacao: [{ msg: 'Este nome de usuário não está cadastrado no banco de dados!' }] });
            }
        } else {
            let connection = app.config.dbConnection(); // conexão com banco de dados
            let eventosModel = new app.app.models.EventosDAO(connection); // instanciando a classe com métodos referentes ao banco de dados
            eventosModel.getEventos((error, result) => { // Aqui usamos o método da classe para trazer todos os registros no banco de dados
                res.render('crudadm', { eventos: result, validacao: [] });
            });
        }

    }


    static excluir(app, req, res) {
        if (req.session.autorizado) {
            let connection = app.config.dbConnection(); // conexão com banco de dados
            let eventosModel = new app.app.models.EventosDAO(connection); // instanciando a classe com métodos referentes ao banco de dados
            eventosModel.excluirEventos(req.body.id, (error, req) => {
                eventosModel.getEventos((error, result) => {
                    res.render('crudadm', { eventos: result, validacao: [{ msg: 'Evento excluido com sucesso!' }] });
                });
            });

        } else {
            res.render('loginadm', { validacao: [] });
        }
    }

    static atualizar(app, req, res) {
        if (req.session.autorizado) {
            let connection = app.config.dbConnection(); // conexão com banco de dados
            let eventosModel = new app.app.models.EventosDAO(connection); // instanciando a classe com métodos referentes ao banco de dados
            eventosModel.getEvento(req.body.id, (error1, result1) => {
                eventosModel.getEventosW(req.body.id, (error2, result2) => {
                    res.render('updateadm', { eventos: result2, validacao: [], update: result1 });
                });
            });
        } else {
            res.render('loginadm', { validacao: [] });
        }
    }

    static update(app, req, res) {
        if (req.session.autorizado) {
            let connection = app.config.dbConnection(); // conexão com banco de dados
            let eventosModel = new app.app.models.EventosDAO(connection); // instanciando a classe com métodos referentes ao banco de dados
            req.body.data_formatada = req.body.data.split("/")[2] + "-" + req.body.data.split("/")[1] + "-" + req.body.data.split("/")[0];
            eventosModel.updateEvento(req.body, (error1, result1) => {
                eventosModel.getEventos((error2, result2) => {
                    res.render('crudadm', { eventos: result2, validacao: [{ msg: 'Evento alterado com sucesso!' }] });
                });
            });
        } else {
            res.render('loginadm', { validacao: [] });
        }
    }


    static criar(app, req, res) {
        if (req.session.autorizado) {
            let connection = app.config.dbConnection(); // conexão com banco de dados
            let eventosModel = new app.app.models.EventosDAO(connection); // instanciando a classe com métodos referentes ao banco de dados
            eventosModel.getEventos((error2, result2) => {
                res.render('criaradm', { eventos: result2, validacao: [] });
            });
        } else {
            res.render('loginadm', { validacao: [] });
        }
    }

    static create(app, req, res) {
        if (req.session.autorizado) {
            let connection = app.config.dbConnection(); // conexão com banco de dados
            let eventosModel = new app.app.models.EventosDAO(connection); // instanciando a classe com métodos referentes ao banco de dados
            let temp= req.body.data.split("/")[2] + "-" + req.body.data.split("/")[1] + "-" + req.body.data.split("/")[0];
            req.body.data = temp;
            eventosModel.criarEvento(req.body, (error1, result1) => {
                eventosModel.getEventos((error2, result2) => {
                    res.render('crudadm', { eventos: result2, validacao: [{ msg: 'Evento criado com sucesso!' }] });
                });
            });
        } else {
            res.render('loginadm', { validacao: [] });
        }
    }
}

module.exports = () => {
    return Adm;
}