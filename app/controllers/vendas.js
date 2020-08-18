class Vendas {
    static home(app, req, res) {
        if (!req.session.autorizado) {
            res.redirect('userlogin');
        } else {

            let connection = app.config.dbConnection(); // conexão com banco de dados
            let eventosModel = new app.app.models.EventosDAO(connection); // instanciando a classe com métodos referentes ao banco de dados
            eventosModel.getEvento(req.body.eventos_id, (error, result) => {
                res.render('venda', { eventos: result, user: { username: req.body.username } })
            });

        }
    }

    static finalizar(app, req, res) {
        if (!req.session.autorizado) {
            res.redirect('userlogin');
        } else {
            let connection = app.config.dbConnection(); // conexão com banco de dados
            let userModel = new app.app.models.UserDAO(connection); // instanciando a classe com métodos referentes ao banco de dados
            userModel.getUser(req.body.username,(error1,result1)=>{
                let vendasModel = new app.app.models.VendasDAO(connection); // instanciando a classe com métodos referentes ao banco de dados
                console.log(req.body);
                let obj = {valor: parseFloat( req.body.quantidade*req.body.valor),
                    fk_cliente: result1[0].id,
                    fk_evento: parseInt(req.body.eventos_id)

                };
                vendasModel.finalizar(obj,(error2,result2)=>{
                    let eventosModel = new app.app.models.EventosDAO(connection); // instanciando a classe com métodos referentes ao banco de dados
                    
                    let obj2 = { id:parseInt(req.body.eventos_id), ingressos_disp:parseInt(req.body.ingressos_disp-req.body.quantidade)}
                    
                    eventosModel.updateIngressos(obj2,(error3,result3)=>{

                        console.log(error3);

                        eventosModel.getEventos((error4, result4) => { // Aqui usamos o método da classe para trazer todos os registros no banco de dados
                            res.render('cruduser', { user: { username:req.session.usuario }, eventos: result4, validacao:[{msg:'Compra efetuada com sucesso!'}] })
                        });
                    });
                });
            });
        }
    }
}

module.exports = () => {
    return Vendas;
}