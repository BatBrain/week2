"use strict";

var express = require("express");
var app = express();
var PORT = process.env.PORT || 8080; // default port 8080
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded());
app.set("view engine", "ejs");

var urlDatabase = {
    "b2xVn2": "http://www.lighthouselabs.ca",
    "9sm5xK": "http://www.google.com"
};

let templateVars = { urls: urlDatabase };

app.get("/", (req, res) => {
    res.end("Hello!");
});

app.get("/urls", (req, res) => {
    res.render("urls_index", templateVars);
});

app.get("/urls/new", (req, res) => {
    res.render("urls_new");
});

app.post("/urls", (req, res) => {
    var prefix = '';
    if ((`${req.body.longURL}`).search('http://')) { var prefix = "http://"};
    urlDatabase[generateRandomString()] = `${prefix}${req.body.longURL}`; // debug statement to see POST parameters
    res.render("urls_index", templateVars);
});

app.get("/urls/:id", (req, res) => {
    if (urlDatabase[req.params.id]) {
        res.redirect(`${urlDatabase[req.params.id]}`)
    }
   res.render("urls_index", templateVars);
})

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}!`);
});

function generateRandomString() {
    return Math.random().toString(36).slice(2, 8)
};
