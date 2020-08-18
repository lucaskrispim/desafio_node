module.exports = (app) => { // rota da inserção externa de dados na aplicação
    app.post('/comprar', (req, res) => {
      app.app.controllers.vendas.home(app, req, res);
    });

    app.post('/finalizarcompra', (req, res) => {
      app.app.controllers.vendas.finalizar(app, req, res);
    });

  };