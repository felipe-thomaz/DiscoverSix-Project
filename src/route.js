const express = require('express'); //importa o express
const QuestionController = require('./controllers/QuestionController')
const RoomController = require('./controllers/RoomController')

const route = express.Router(); //route guarda todas as funcionalidades de Router que o express tem

route.get('/', (req, res) => res.render("index", {page: 'enter-room'}));
route.get('/create-pass', (req, res) => res.render("index", {page: 'create-pass'}));

route.post('/create-room', RoomController.create)
route.get('/room/:room', RoomController.open);
route.post('/join-room', RoomController.join)

route.post('/question/:room/:question/:action', QuestionController.index);
route.post('/question/create/:room', QuestionController.create)



module.exports = route; //exporta o route para ser importado no server


