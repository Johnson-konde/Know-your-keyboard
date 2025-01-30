import express from "express";
import bodyParser from "body-parser";
const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

var fullDate = new Date();
var year = fullDate.getFullYear();
app.get("/", (req, res) => {
  res.render("home.ejs")
});
app.post("/submit", (req, res) => {
  var name = req.body.name;
res.render("game.ejs", {Name: name, Year: year})

});
app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
  });


  