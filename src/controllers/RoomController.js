const Database = require('../db/config')

module.exports = {
  async create(req, res) {
    //função create direcionada dentro do route.js
    const db = await Database()
    const pwd = req.body.password // pega o password (name) no form do arquivo "create-pass"

    let roomId
    let isRoom = true
    while (isRoom) {
      // o while roda enquanto o isRoom for true

      // Gera o número da sala
      for (var i = 0; i < 6; i++) {
        i == 0
          ? (roomId = Math.floor(Math.random() * 10).toString())
          : (roomId += Math.floor(Math.random() * 10).toString())
      }

      // Puxa do db os IDs da tabela rooms
      const idCheck = await db.all(`SELECT id FROM rooms`) //quando for um comando para retornar algo, usa-se o "db.all" no lugar do "db.run"
      //Verifica se o ID criado já existe na tabela rooms
      isRoom = idCheck.some(verificationRoom => verificationRoom === roomId)

      // Se o isRoom for false, ele insere o novo id na tabela rooms
      if (!isRoom) {
        // Insere a sala no banco
        await db.run(`INSERT INTO rooms (
          id,
          password)
          VALUES (
            ${parseInt(roomId)},
            ${pwd}
          )`)
      }
    }

    await db.close()

    res.redirect(`/room/${roomId}`)
  },

  async open(req, res) {
    const db = await Database()
    const roomId = req.params.room

    const questions = await db.all(
      `SELECT * FROM questions WHERE room = ${roomId} and read = 0`
    )
    const questionsRead = await db.all(
      `SELECT * FROM questions WHERE room = ${roomId} and read = 1`
    )

    let isNotAQuestion
    if(questions.length == 0){
      if(questionsRead.length == 0){
        isNotAQuestion = true
      }
    }
    
    res.render("room", {
      roomId: roomId,
      questions: questions,
      questionsRead: questionsRead,
      isNotAQuestion: isNotAQuestion
    })
},

  join(req, res){
    const roomId = req.body.roomId

    res.redirect(`/room/${roomId}`)
  }
}
