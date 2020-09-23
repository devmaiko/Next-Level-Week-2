/* /* /*colocamos a rota*/
//servidor
const express = require('express')
const server = express()
//cahmar funcoes das pagina
const {
    pageLanding,
    pageStudy,
    pageGiveClasses,
    saveClasses
} = require('./pages')


//configurar nunjucks
const nunjucks = require('nunjucks')
nunjucks.configure('src/views', {
    express: server,
    //deixar a busca mais rapida sem cache
    noCache: true,
})

//configuracao do servidor para puxar o css
//static= tudo que esta na pasta public
server.use(express.urlencoded({ extended: true}))
    .use(express.static("public"))
    //rotas da aplicacao
    .get("/", pageLanding)
    .get("/study", pageStudy)
    .get("/give-classes", pageGiveClasses)
    .post("/save-classes", saveClasses)
    .listen(5500)



