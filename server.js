require('dotenv').config() // deixa a Connection String segura.
const express = require('express')
const app = express() // inicia o Express.
const mongoose = require('mongoose') // modela a Base de Dados e salva no Schema que foi desenvolvido.
mongoose.connect(process.env.CONNECTIONSTRING)
    .then(() => {
        app.emit('pronto') // promise de conexão do banco -> inicia o server.
    })
    .catch(e => console.log(e))
const session = require('express-session') // salva um Cookie da Sessão contendo ids ou qualquer outro dado. 
const MongoStore = require('connect-mongo') // salva as sessões na base de dados.
const flash = require('connect-flash') // mensagens que após leitura somem da base de dados.
const routes = require('./routes') // rotas da aplicação.
const path = require('path') // trabalha com os caminhos, absolutos ou relativos.
const helmet = require('helmet') // recomendação do Express para segurança da aplicação.
const csrf = require('csurf') // tokens de segurança para impedir site maliciosos de postar algo para dentro da aplicação.
const { middlewareGlobal, checkCsrfError, csrfMiddleware } = require('./src/middlewares/middlewares') // middles são funções que são executadas durante as rotas.

//app.use(helmet()) // usa o Helmet.

app.use(express.urlencoded({ extended: true })) // possibilita postar formulários para dentro da aplicação.
app.use(express.json()) // parse de JSON para dentro da aplicação.
app.use(express.static(path.resolve(__dirname, 'public'))) // arquivos estáticos que podem ser acessados diretamente.

const sessionOptions = session({ // configurações de sessão.
    secret: 'qualquer coisa que eu quiser colocar aqui dentro....',
    store: MongoStore.create({ mongoUrl: process.env.CONNECTIONSTRING }),
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true
    }
})
app.use(sessionOptions) // usa a configuração de sessão.
app.use(flash()) // usa as flash mensagens.

app.set('views', path.resolve(__dirname, 'src', 'views')) // arquivos que renderizam na tela.
app.set('view engine', 'ejs') // engine usada para renderizar códigos js junto ao HTML.

app.use(csrf()) // usa o CSRF token.
// Middlewares
app.use(middlewareGlobal)
app.use(checkCsrfError)
app.use(csrfMiddleware)
app.use(routes) // chama as rotas.

app.on('pronto', () => { // escutar na porta definida.
    app.listen(3003, () => {
        console.log('Acesso em http://localhost:3003')
        console.log('Servidor em execução na porta 3003')
    })
})
