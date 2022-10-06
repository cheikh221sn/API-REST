const sqlite3 = require("sqlite3").verbose();

const dbFile = "db.sqlite";


let db = new sqlite3.Database(dbFile, (err) => {
  if (err) {
    console.error(err.message);
    throw err;
  } 
  else {
    console.log("Connexion a la base sqlite3...");
    const sql = `CREATE TABLE article (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      Titre text,
      Resume text,
      contenu text,
      auteur text,
      datecreation text,
      datadernieremaj text,
    )`;
    db.run(sql, (err) => {
      if (err) {
        console.log("Table deja cree");
      }
    });
  }
});

module.exports = db;