const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const connectDB = require("./connect.js");
const path = require("path"); // Dodaj import modułu 'path'
const app = express();

console.log("Working");

app.use(express.static(__dirname + "/public"));

// Ustawienie ścieżki do katalogu z widokami
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(morgan("tiny"));
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(express.json());
// app.use(methodOverride("_method"));

dotenv.config({
  path: "./.env",
});

const ProductDb = require("./model.js");

console.log(process.env.DATABASE_URI);

connectDB();

app.get("/", (req, res) => {
  res.send(`
    <form action="/products" method="get">
      <button type="submit">Przejdź do produktów</button>
    </form>
  `);
});

app.listen(process.env.PORT, () => {
  console.log(`server is running on port ${process.env.PORT}`);
});

app.get("/products", (req, res) => {
  ProductDb.find()
    .then((products) => {
      res.render("products.ejs", {
        products: products,
      });
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

app.post("/products", (req, res) => {
  if (!req.body) {
    res.status(400).send({ message: "Content can not be empty" });
    return;
  }
  const product = new ProductDb({
    name: req.body.name,
    green: req.body.green ?? false,
  });

  product
    .save()
    .then((data) => {
      res.redirect("/products");
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: err.message || "Error while saving to db" });
    });
});

app.get("/products/delete/:id", (req, res) => {
  console.log(req.params.id);
  ProductDb.findByIdAndDelete(req.params.id).then((result) => {
    res.redirect("/products");
  });
});

app.get("/products/update/:id", (req, res) => {
  ProductDb.findById(req.params.id)
    .exec()
    .then((result) => {
      console.log(["result", result]);

      ProductDb.findByIdAndUpdate(result._id, {
        green: !result.green,
      }).then((result) => {
        res.redirect("/products");
      });
    });
});
