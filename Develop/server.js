var app = express();
var PORT = process.env.PORT ? process.env.PORT : 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "index.html"));
  });

app.get("/notes", function(req, res) {
res.sendFile(path.join(__dirname, "./notes.html"));
});

app.post("/api/tables", function(req, res){
  let newReserve = req.body;
  if(tables.length < 5){
    tables.push(newReserve)
  }
  else(waitlist.push(newReserve));

  return res.json(tables)
});

app.get("/api/tables", function(req, res) {
return res.json(tables);
});

app.get("/api/waitlist", function(req, res) {
return res.json(waitlist);
});

app.post("/api/tables", function(req, res) {

})


app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });