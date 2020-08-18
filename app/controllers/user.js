class User {
    static login(app, req, res) {
        if (!req.session.autorizado) {
            res.render('loginuser', { validacao: [] });
        } else {
            res.redirect('cruduser');
        }
    }

    static logar(app, req, res) {
        if (!req.session.autorizado) {
            let connection = app.config.dbConnection(); // conexão com banco de dados
            let userModel = new app.app.models.UserDAO(connection); // instanciando a classe com métodos referentes ao banco de dados
            userModel.getUser(req.body.username, (error, result) => {
                if (result && result[0].senha == app.get('md5')(req.body.senha)) {
                    req.session.autorizado = true;
                    req.session.usuario = req.body.username;
                    req.session.senha = req.body.senha;
                    res.redirect('cruduser');
                } else {
                    res.render('loginuser', { validacao: [{ msg: 'Erro de autenticação' }] });
                }
            });
        } else {
            res.redirect('cruduser');
        }
    }

    static logout(app, req, res) {
        if (!req.session.autorizado) {
            res.render('loginuser', { validacao: [] });
        } else {
            req.session.autorizado = false;
            req.session.usuario = '';
            req.session.senha = '';
            res.redirect('/');
        }
    }

    static cadastro(app, req, res) {
        if (!req.session.autorizado) {
            res.render('cadastrouser', { validacao: [], dadosForm: {} });
        } else {
            res.redirect('cruduser');
        }
    }

    static criar(app, req, res) {

        if (!req.session.autorizado) {
            let erros = new app.app.validators.validator();
            erros.isRequired(req.body.nome, 'Nome é necesário');
            erros.isRequired(req.body.telefone, 'Telefone é necesário');
            erros.isRequired(req.body.email, 'Email é necesário');
            erros.isRequired(req.body.cpf, 'CPF é necesário');
            erros.isRequired(req.body.senha, 'Senha é necesário');
            erros.isRequired(req.body.endereco, 'Endereço é necesário');
            erros.isEmail(req.body.email,'Este não é um email válido')

            if (!erros.isValid()) {
                res.render('cadastrouser', { validacao: erros.errors, dadosForm: req.body });
                return;
            }

            let connection = app.config.dbConnection(); // conexão com banco de dados
            let userModel = new app.app.models.UserDAO(connection); // instanciando a classe com métodos referentes ao banco de dados
            userModel.getUser(req.body.username, (error1, result1) => {
                if (result1.length == 0) {
                    req.body.senha = app.get('md5')(req.body.senha);
                    userModel.createUser(req.body, (error2, result2) => {
                        if (!error2) {
                            console.log("result 2 "+result2);
                            req.session.autorizado = true;
                            req.session.usuario = req.body.username;
                            req.session.senha = req.body.senha;

                            res.redirect('cruduser');
                        } else {
                            res.render('cadastrouser', { validacao: [{ msg: 'tivemos problemas ao concluir seu cadastro. Tente novamente!' }], dadosForm: {} });
                        }
                    });
                } else {
                    res.render('cadastrouser', { validacao: [{ msg: 'Este apelido já está em uso no nosso sistema de cadastro' }], dadosForm: {} });
                }
            })
        } else {
            res.redirect('cruduser')
        }
    }

    static crud(app, req, res) {
        if (!req.session.autorizado) {
            res.render('loginuser', { validacao: [] });
        } else {
            let connection = app.config.dbConnection(); // conexão com banco de dados
            let eventosModel = new app.app.models.EventosDAO(connection); // instanciando a classe com métodos referentes ao banco de dados
            eventosModel.getEventos((error, result) => { // Aqui usamos o método da classe para trazer todos os registros no banco de dados
                res.render('cruduser', { user: { username:req.session.usuario }, eventos: result, validacao:[] })
            });
        }
    }
}


module.exports = () => {
    return User;
}