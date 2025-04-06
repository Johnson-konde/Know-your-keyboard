import express from "express";
import bodyParser from "body-parser";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const fullDate = new Date();
const year = fullDate.getFullYear();
const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("home.ejs", {Year : year});
});

app.post("/submit", (req, res) => {
  
  const name = req.body.name;
  res.render("game.ejs", { Name: name, Year: year });
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));






/*import express from "express";
import bodyParser from "body-parser";
const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

var fullDate = new Date();
var year = fullDate.getFullYear();
app.get("/", (req, res) => {
  res.render("home.ejs", {Year: year})
});
app.post("/submit", (req, res) => {
  var name = req.body.name;
res.render("game.ejs", {Name: name, Year: year})

});
app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
  });*/

  
