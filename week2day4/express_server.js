"use strict";

//Declare constants and require statements
const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080; // default port 8080
const bodyParser = require("body-parser");
const connect = require('connect')
const methodOverride = require('method-override')
const MongoClient = require("mongodb").MongoClient;
const MONGODB_URI = "mongodb://127.0.0.1:27017/url_shortener";
    //

//Set and Use Declarations:
app.use(bodyParser.urlencoded());
app.set("view engine", "ejs");
app.use(methodOverride('_method'));
//

/*var urlDatabase = {
    "b2xVn2": "http://www.lighthouselabs.ca",
    "9sm5xK": "http://www.google.com"
};
let templateVars = { urls: urlDatabase };
*/
let db = null;

MongoClient.connect(MONGODB_URI, (err, database) => {
  if (err) {
    console.log('Could not connect! Unexpected error. Details below.');
    throw err;
  }
  console.log('Connected to the database!');
  db = database;
});


function getLongURL(db, shortURL, cb) {
  let query = { "shortURL": shortURL };
  db.collection("urls").findOne(query, (err, result) => {
    if (err) {
      return cb(err);
    }
    return cb(null, result.longURL);
  });
}



//Landing Page:
app.get("/", (req, res) => {
    res.end("Hello!");
});

// ../urls page:
app.get("/urls", (req, res) => {
    db.collection("urls").find().toArray((err, data) => {
        res.render("urls_index", {urls: data});
    });
});

// Create new shortened URL page:
app.get("/urls/new", (req, res) => {
    res.render("urls_new");
});

// inserts data from ../urls/new form submission and loads back to ../urls page
app.post("/urls", (req, res) => {
    var prefix = '';
    if ((`${req.body.longURL}`).search('http://')) {
        var prefix = "http://" };
    //urlDatabase[generateRandomString()] = `${prefix}${req.body.longURL}`;
    db.collection("urls").insertOne({shortURL: [generateRandomString()], longURL: `${prefix}${req.body.longURL}`});
    db.collection("urls").find().toArray((err, data) => {
        res.render("urls_index", {urls: data});
    });
});


//redundant, was example provided by compass
/*app.get("/urls/:id", (req, res) => {
  let shortURL = req.params.id;
  getLongURL(db, shortURL, (err, longURL) => {
    console.log(longURL);
    res.redirect(`${longURL}`);
  });
});*/


// Checks if shortURL exists, redirects to longURL if true, ../urls if not (insert err notification here later)
app.get("/urls/:id", (req, res) => {
    if (db.collection("urls").find({urls: `${req.params.id}`})) {
        //res.redirect(`${urlDatabase[req.params.id]}`)
        let shortURL = req.params.id;
        getLongURL(db, shortURL, (err, longURL) => {
            console.log(longURL);
            res.redirect(`${longURL}`);
    });
    }
    db.collection("urls").find().toArray((err, data) => {
        res.render("urls_index", {urls: data});
    });
});

// delete button from ../urls removes from db then refreshes page
app.delete("/urls/:id", (req, res) => {
    console.log(`A user has deleted: [${req.params.id}: ${urlDatabase[req.params.id]}]`)
    delete urlDatabase[`${req.params.id}`]
    res.redirect("/urls");
})

// edit button from ../urls sends to edit page of specific pair.
app.get("/urls/show/:id", (req, res) => {
    let passedIn = {shortURL: req.params.id, longURL: urlDatabase[req.params.id]};
    res.render("urls_show", passedIn);
})

// submit req from ../urls/show/:id, updates short/long pair, redirects to ../urls
app.put("/urls/:id", (req, res) => {
    var prefix = '';
    if ((`${req.body.longURL}`).search('http://')) {
        var prefix = "http://" };
    urlDatabase[req.params.id] = `${prefix}${req.body.longURL}`;
    res.redirect("/urls");
})



///ASSORTED FUNCTIONS AND BASE COMMANDS///
app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}!`);
});

function generateRandomString() {
    return Math.random().toString(36).slice(2, 8)
};



//Catch process exits and close mongo connections
/*process.on("SIGINT", () => {
    console.log("Closing mongodb connection...");
    db.close();
});

process.on("EXIT", () => {
    console.log("Closing mongodb connection...");
    db.close();
});*/