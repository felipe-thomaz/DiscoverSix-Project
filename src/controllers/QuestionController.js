const Database = require('../db/config')

module.exports = {
  async index(req, res){
    const db = await Database()
    const roomId = req.params.room;
    const questionId = req.params.question;
    const action = req.params.action;
    const pwd = req.body.password;
    
    //Verificar se a senha está correta
    //db.get só traz UM dado que encontrar no db
    const roomCheck = await db.get(`SELECT * FROM rooms WHERE id = ${roomId}`)

    if(roomCheck.password == pwd){
      if (action == "delete") {
        await db.run(`DELETE FROM questions WHERE id = ${questionId}`)

      }else if(action == "check"){
        await db.run(`UPDATE questions SET read = 1 WHERE id = ${questionId}`)
      }
      res.redirect(`/room/${roomId}`)
    } else{
      //redireciona para o wrongpassword.ejs caso a senha digitada na modal esteja errada
      res.render('wrongpassword', {roomId: roomId})
    }

  },

  async create(req, res){ // async e await são "siamêses"
    const db = await Database()
    const question = req.body.question
    const roomId = req.params.room
    
    await db.run(`INSERT INTO questions (
      title,
      room,
      read
    ) VALUES(
      "${question}",
      ${roomId},
      0
    )`)
    // VALUES("${question}" leva aspas pois está inserindo um texto no db.
    res.redirect(`/room/${roomId}`)
  }
}