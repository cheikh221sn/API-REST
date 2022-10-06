const express = require("express");
const db = require("./db.js");

const app = express();

app.use(express.urlencoded({extended:false}));
app.use(express.json());

const PORT = 5000;

app.get("/", function(req, res){
    res.json({message:"API works fine"})

});

app.get("/api/article", (req, res)=>{
    const sql = "SELECT * FROM article ";
    db.all(sql, (err, rows)=>{
        if(err){
            res.status(400).json({error: err.message});
            return;

        }
        res.json({message:"Listes des articles", Data:rows });
    });
});

app.get("/api/article/:id", (req, res) => {
    const { id: articleID } = req.params;
    const sql = "SELECT * FROM article WHERE id = ?";
    const params = [articleID];
    db.get(sql, params, (err, row) => {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      res.json({ message: `Affiche article ${contacteID}`, data: row });
    });
  });

  app.post("/api/article", (req, res) => {
    const { Titre, Resume, contenu, auteur, datecreation, datadernieremaj } = req.body;
  
    if (!Titre || !Resume || !contenu ||!auteur ||!datecreation ||!datadernieremaj) {
      res.status(400).json({ error: "Merci de remplir tous les champs!" });
      return;
    }
  
    const article = { Titre, Resume, contenu, auteur, datecreation, datadernieremaj };
    const sql = "INSERT INTO article (Titre, Resume, contenu, auteur, datecreation, datadernieremaj) VALUES (?,?,?,?,?,?)";
    const params = [article.Titre, article.Resume, article.contenu, article.auteur, article.datecreation, article.datadernieremaj];
    db.run(sql, params, function (err, result) {
      if (err) {
        res.status(400).json({ error: err.message });
        console.log(err);
        return;
      }
      res
        .status(201)
        .json({ message: "article créé...", data: article });
    });
  });

  app.put("/api/article/:id", (req, res) => {
    const { id: articleID } = req.params;
    const { Titre, Resume, contenu, auteur, datecreation, datadernieremaj } = req.body;
  
    if (!Titre || !Resume || !contenu ||!auteur ||!datecreation ||!datadernieremaj) {
      res.status(400).json({ error: "Merci de remplir tous !" });
      return;
    }
  
    const article = {Titre, Resume, contenu, auteur, datecreation, datadernieremaj };
    const sql = "UPDATE article SET Titre = ?, Resume = ?, contenu  = ?,auteur = ?, datecreation = ?,datadernieremaj = ? WHERE id = ?";
    const params = [article.Titre, article.Resume, article.contenu, article.auteur, article.datecreation, article.datadernieremaj, articleID];
    db.run(sql, params, function (err, reslut) {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      res.status(201).json({
        message: `article ${contacteID} modifié avec succes`,
        data: article,
      });
    });
  });

  app.delete("/api/article/:id", (req, res) => {
    const { id: articleID } = req.params;
    const sql = "DELETE FROM article WHERE id = ?";
    db.run(sql, articleID, function (err, resultat) {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      res.json({
        message: `article ${articleID} supprimé`,
        data: this.changes,
      });
    });
  });
  
  
  app.listen(PORT, function () {
   
    console.log(`L'application est demarré au port: ${PORT}`);
  });
