// modulo de configuração do Server

const express = require('express')
const session = require('express-session')

const app = express()

// definir o motor de views como sendo o ejs
app.set('view engine', 'ejs')

// setar o diretorio de views do EJS
app.set('views', './app/views')

// configuração arquivos estáticos
app.use(express.static('./app/public'))

//configuração do método post
app.use(express.urlencoded( { extended: true} ) )

// Configuração Session
app.use(session({
    secret: 'kdf*3Q^wqUhU_,',
    resave: false,
    saveUninitialized: false
}))

module.exports = app