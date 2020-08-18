module.exports = (app) => { // rota da inserção externa de dados na aplicação
  app.get('/userlogin', (req, res) => {
    app.app.controllers.user.login(app, req, res);
  });

  app.get('/usercadastro', (req, res) => {
    app.app.controllers.user.cadastro(app, req, res);
  });

  app.post('/usercriar', (req, res) => {
    app.app.controllers.user.criar(app, req, res);
  });

  app.post('/userlogar', (req, res) => {
    app.app.controllers.user.logar(app, req, res);
  });

  app.get('/cruduser', (req, res) => {
    app.app.controllers.user.crud(app, req, res);
  })

  app.get('/userlogout',(req,res)=>{
    app.app.controllers.user.logout(app,req,res);
  })

};