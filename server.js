var express = require("express");
var path = require("path");
var fs = require("fs");
var db = require("./db/db.json")
var app = express();
var PORT = process.env.PORT ? process.env.PORT : 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'))
// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
//catch-all for any additions to the base html to send user to homepage

app.get("/notes", function(req, res) {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});

app.post("/api/notes", function(req, res){
  if(db.length){
    req.body.id = db[db.length - 1].id + 1
  }else{
    req.body.id = 0 
  }
  db.push(req.body);
  fs.writeFile("./db/db.json", JSON.stringify(db), err=>{
    if(err){
      console.log(err);
      res.sendStatus(400);
    }else{
      res.sendStatus(200);
    }
  })
});

app.post("/api/clear", function(req, res){
  //deletes data from notes page
  db.splice(0);
  res.json("Successfully deleted!");
})

app.delete("/api/notes/:id", (req, res)=>{
  const id = parseInt(req.params.id);
  const newArr = [];
  for (let i = 0; i < db.length; i++) {
    if(id !== db[i].id){
      newArr.push(db[i]);
    }
  }
  db = newArr;
  fs.writeFile("./db/db.json", JSON.stringify(db), err=>{
    if(err){
      console.log(err);
      res.sendStatus(400);
    }else{
      res.sendStatus(200);
    }
  });
})

app.get("/api/notes", function(req, res) {
  return res.json(db);
});

app.post("/api/notes", function(req, res) {
  
})

app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "./public/index.html"));
  });

app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
  });