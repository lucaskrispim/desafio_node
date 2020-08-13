module.exports = (app) => { // rota da inserção externa de dados na aplicação
  app.get('/admlogin', (req, res) => {
    app.app.controllers.adm.login(req, res);
  });

  app.post('/admautenticar', (req, res) => {
    app.app.controllers.adm.autenticar(app, req, res);
  });

};


