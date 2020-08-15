module.exports = (app) => { // rota da inserção externa de dados na aplicação
  app.get('/admlogin', (req, res) => {
    app.app.controllers.adm.login(app, req, res);
  });

  app.post('/admatualizar', (req, res) => {
    app.app.controllers.adm.atualizar(app, req, res);
  });

  app.post('/admupdate', (req, res) => {
    app.app.controllers.adm.update(app, req, res);
  });

  app.post('/admexcluir', (req, res) => {
    app.app.controllers.adm.excluir(app, req, res);
  });

  app.post('/admautenticar', (req, res) => {
    app.app.controllers.adm.autenticar(app, req, res);
  });

  app.get('/admcriar', (req, res) => {
    app.app.controllers.adm.criar(app, req, res);
  });

  app.post('/admcreate', (req, res) => {
    app.app.controllers.adm.create(app, req, res);
  });

  app.get('/admlogout', (req, res) => {
    app.app.controllers.adm.logout(app, req, res);
  })

};


