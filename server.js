var express = require("express");
var path = require("path");
var fs = require("fs");
var db = require("./db/db.json")
var app = express();
var PORT = process.env.PORT ? process.env.PORT : 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "./public/index.html"));
  });

app.get("/notes", function(req, res) {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});

app.post("/api/notes", function(req, res){
  db.push(req.body);
  return res.json(db)
});

app.post("/api/clear", function(req, res){
  //deletes data from notes page
  db.splice(0);
  res.json("Successfully deleted!");
})

app.get("/api/notes", function(req, res) {
return res.json(db);
});

app.post("/api/notes", function(req, res) {

})


app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });