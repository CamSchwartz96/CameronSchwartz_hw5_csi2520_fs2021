const express = require("express");
const path = require("path");
const ejs = require("ejs");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
    res.render("index")
});

app.get("/blog", (req, res) => {
    res.render("blog")
});

app.get("/resume", (req, res) => {
    res.render("resume")
});

app.get("/facts", (req, res) => {
    res.render("facts")
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server running on ${PORT}`));