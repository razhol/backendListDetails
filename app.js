
const express = require("express");
const cors = require("cors");
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require("body-parser");
const app = express();



let db = new sqlite3.Database('./chinook.db');


db.serialize(function() {
    db.run("CREATE TABLE IF NOT EXISTS persons(id INTEGER PRIMARY KEY, name text NOT NULL,color text NOT NULL,enabled text NOT NULL)");
  

  });
  


app.use(cors());
app.use(bodyParser.json());

app.post("/api/insert",async(req,res)=>{
    const Name = req.body.Name;
    const Color = req.body.Color;
    const Checked = req.body.Checked;

    console.log('Name: ' + Name + ' Color: ' + Color  + ' checked: ' + Checked);
    db.run('INSERT INTO persons(name, color, enabled) VALUES(?, ?,?)',[Name,Color,Checked], (err) => {
        if(err) {
            return console.log(err.message); 
        }
        console.log('Row was added to the table: ${this.lastID}');
    })
})

app.get("/read",async(req,res)=>{
    db.all('SELECT * from persons', (err, rows) => {
        if (err) {
          console.log(err)
        } else {
          console.log(rows)
          res.send(rows);
        }
      })


})

app.listen(5000, () =>{
    console.log("server is running on port 5000");
})  
