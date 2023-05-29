//jshint esversion:6

const express = require('express');
const bodyParser = require("body-parser");
const _ = require('lodash')

const ejs = require('ejs');

let entry = [];

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get("/", function (req, res) {
    res.render("home", { pageTitle: "Hello, World!" });
});

app.get('/compose', function (req, res) {
  res.render('compose', {pageTitle: "Escreva"});
});

app.post('/compose', function (req, res) {
  let title = req.body.newTitle;
  let content = req.body.newContent;

  let entries = {
    title: title,
    content: content
  } 
  entry.push(entries) 
  console.log(entries);
  res.redirect('/allPosts');
});

app.get("/about", function (req, res) {
    res.render("about", { pageTitle: "Sobre"});
});

app.get("/contact", function (req, res) {
    res.render("contact", { pageTitle: "Contato"});
});


app.get('/allPosts/:entryTitle', (req, res) => {
    const requestedTitle = _.lowerCase(req.params.entryTitle);
    console.log(req.params.entryTitle)
    entry.forEach(function(entry){
        const storedTitle = _.lowerCase(entry.title)

        if(storedTitle === requestedTitle){
            console.log('found');
            res.render("post", {
                title: entry.title,
                content: entry.content
            })
        }else{
            console.log('not found');
        }
    })
});
  
  
  app.get('/allPosts', (req, res) => {
    res.render('allPosts', { pageTitle: 'Posts', newArticles: entry });
  });
  
  
  


  

app.listen(7000, function () {
    console.log("Server started on port 7000");
});
