const express = require('express');
const bodyParser = require('body-parser');
const url = require('url');
const querystring = require('querystring');
const Article = require('./models').Article;

let app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Function to handle the root path
app.get('/', async function (req, res) {
  // Access the provided 'page' and 'limt' query parameters
  let page = req.query.page; // ! req.query
  let limit = req.query.limit; // ! req.query

  let articles = await Article.findAll()
    .paginate({ page: page, limit: limit })
    .exec();

  // Return the articles to the rendering engine
  res.render('index', {
    articles: articles,
  });
});

// Route to return all articles with a given tag
app.get('/tag/:id', async function (req, res) {
  // Retrieve the tag from our URL path
  var id = req.params.id; // ! req.params

  let articles = await Article.findAll({ tag: id }).exec();

  res.render('tag', {
    articles: articles,
  });
});

let server = app.listen(8080, function () {
  console.log('Server is listening on port 8080');
});

/**
 * ! req.params - contains route parameters (in the path portion of the URL),
 * req.params: directly access the parsed route parameters from the path
 */

/**
 * ! req.query: contains the URL query parameters (after the ? in the URL).
 * req.query: directly access the parsed query string parameters
 */
