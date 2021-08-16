const sqlite3 = require("sqlite3");
const { open } = require("sqlite") //importa só a função open do sqlite

module.exports = () => 
  open({
    filename: 'src/db/discoversix.sqlite',
    driver: sqlite3.Database,
  })
