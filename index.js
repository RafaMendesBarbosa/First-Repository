// npm init
// git init
// npm install express
// npm install -g nodemon
// npm install ejs
// npm install pg
// npm install express-session

// recuperando o modulo de configuração do server
const app = require('./config/server')

// recuperando o modulo de base de dados
const noticias = require('./mockup')

// recuperar modulo de conexão com o Postgre
const db = require('./config/dbConnection')

// rota home
app.get('/', function(req, res){
    db.query('SELECT * FROM noticias ORDER BY id_noticia DESC LIMIT 3', function(error, result){
        res.render('home/index', { noticias: result.rows })

    })
})

// rota notícias
app.get('/noticias', function(req, res){
    db.query('SELECT * FROM noticias ORDER BY id_noticia DESC', function(error, result){
        // passamos atravez de um JSON todas as notícias
        res.render('news/noticias', { noticias: result.rows })

    })
})

// rota notícia
app.get('/noticia', function(req, res){
    // recuperar atraves do método GET o ID
    const id = req.query.id

    db.query('SELECT * FROM noticias WHERE id_noticia = $1', [id], function(error, result){
        // console.log(result)
        res.render('news/noticia', { noticia: result.rows[0] })
    })
})

// rota de autenticação
app.post('/admin/autenticar', function(req, res){
    const { usuario, senha } = req.body 

    // console.log(usuario, senha)
    if( usuario == 'root' && senha == 'cellep1234'){
        req.session.autorizado = true
    }

    res.redirect('/admin')
})

// rota sair da área autenticada
app.get('/admin/sair', function(req, res){
    req.session.destroy( erro => {/*console.log(erro)*/})
    res.redirect('/admin')
})

// rota admin
app.get('/admin', function(req, res){
    const autorizado = req.session.autorizado
    if(autorizado == true){
        res.render('admin/form_add_noticia', { autorizado: autorizado })
    } else {
        res.render('admin/login')
    }
})

// rota salvar noticia
app.post('/admin/salvar-noticia', function(req, res){
    const { titulo, conteudo } = req.body

    // console.log(titulo, conteudo)
    db.query('INSERT INTO noticias(titulo, conteudo) VALUES($1, $2)', [titulo, conteudo], function(error, result){
        // redireciona para outra rota e remove as informações do corpo da requisição
        res.redirect('/noticias')
    })

})

app.listen(process.env.PORT || 3000, () => {
    console.log('Servidor rodando com express')
})
