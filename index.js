//Importa o express
const express = require('express')
const path = require('path')
const sqlite3 = require('sqlite3').verbose();


//instanciar um servidor Express
const app = express();

//Configuração do Servidor
app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))
app.use(express.static(path.join(__dirname, "public")))
 

//Conexão com o banco de dados 
const db_name = path.join(__dirname, "data", "apptest.db");
const db = new sqlite3.Database(db_name, err =>{
  if(err){
    return console.error(err.message);
  }
  console.log("Conexão feita com sucesso ao Banco de dados 'apptest.db'")
})


const sql_create = `CREATE TABLE IF NOT EXISTS Books(
  Book_ID INTEGER PRIMARY KEY AUTOINCREMENT,
  Title VARCHAR(100) NOT NULL, 
  Author VARCHAR(100) NOT NULL,
  Comments TEXT
);`;


db.run(sql_create, err =>{
  if (err){
    return console.error(err.message);
  }
  console.log("Tabela 'Books' criada com sucesso");
});

//Populando o banco de dados
const sql_insert = `INSERT INTO Books (Book_ID, Title, Author, Comments) VALUES
(1, 'Mrs. Bridge', 'Evan S. Connell', 'First in the serie'),
(2, 'Mr. Bridge', 'Evan S. Connell', 'Second in the serie'),
(3, 'L''ingénue libertine', 'Colette', 'Minne + Les égarements de Minne');`;

db.run(sql_insert, err => {
  if (err) {
    return console.error(err.message);
  }
  console.log("Successful creation of 3 books");
});








//Iniciado o Servidor 
app.listen(3000, () => {{
  console.log("Servidor iniciado (http://localhost:3000/) !")
}});


//GET home-page
app.get("/", (req, res) =>{{
  // res.send("Hello World...");
  res.render("index")
}})
//GET About
app.get('/about', (req, res) =>{
  res.render("about")//renderizo na tela o HTML
})
//GET data 
app.get('/data', (req, res)=>{
  const test = {
    tittle: "Teste",
    items:["One","two","three"]
    //esse dados são passados ao HTML
  };
  res.render("data", {model: test});
});



