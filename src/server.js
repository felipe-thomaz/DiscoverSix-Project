const express = require('express') //importando o express
const route = require('./route') //importando o route pro server
const path = require('path')
const exp = require('constants')

const server = express()

server.set('view engine', 'ejs') // passa que o módulo EJS vai ser a view engine

server.use(express.static("public"))

server.set('views', path.join(__dirname, 'views')) //novo caminho para achar a pasta views que está dentro de src/views

// pega o conteúdo que vem do formulário, decodifica e passa para o pro controller
server.use(express.urlencoded({extended: true}))

server.use(route) //usa o arquivo route

server.listen(3000, () => console.log('RODANDO'))

// iniciar o npm na pasta "DiscoverSix-Project"
