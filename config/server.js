let express = require('express'); // impostando módulos usados no projeto
//let consign = require('consign'); 
let bodyParser = require('body-parser');
let load = require('express-load'); // parei de usar consign porque não funciona no heroku
let expressSession = require('express-session');

let app = express();    // instancia o módulo
app.set('view engine', 'ejs'); // seta que a engine utilize html
app.set('views','./app/views'); // seta a pasta onde estão guardadas as views

app.use(express.static('./app/public'));    // seta a pasta com arquivos estáticos (css e imagens)
app.use(bodyParser.urlencoded({extended:true}));    // decifrar mensagens vindas de dos verbos http

/*
consign().include('./config/dbConnection.js')    // parei de usar consign por causa do heroku
            .then('./app/models')   
            .then('./app/controllers') 
            .then('./app/routes')
            .into(app);
*/

app.use(expressSession({
	secret: 'hdfhdfdfgsdhjsrtjsrtjswertyweryaerhaseraergaergaserg45345345fghfghfghdfghdfgdfgdfgdfaerqlooo',
	resave:false,
	saveUninitialized:false
}));

load('./config/dbConnection.js') // novo módulo que configura os caminhos da aplicação
                .then('./app/models')   
                .then('./app/controllers') 
                .then('./app/routes')
                .then('./app/utils')
                .into(app);

                
module.exports = app; // exporta esse módulo