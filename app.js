const express = require('express');
const bodyParser= require('body-parser')
const MongoClient = require('mongodb').MongoClient


const app = express();
app.use(bodyParser.urlencoded({extended: true}))
app.set('view engine', 'ejs')


var db

MongoClient.connect('mongodb://admin:pass@ds153198.mlab.com:53198/node_db', (err, client) => {
  if (err) return console.log(err)
  db = client.db('node_db') // whatever your database name is
  app.listen(3000, () => {
    console.log('listening on 3000')
  })
})
app.get('/', (req, res) => {
  db.collection('quotes').find().toArray((err, result) => {
    if (err) return console.log(err)
    // renders index.ejs
    res.render('index.ejs', {quotes: result})
  })
})


  
app.post('/quotes', (req, res) => {
  db.collection('quotes').save(req.body, (err, result) => {
    if (err) return console.log(err)

    console.log('saved to database')
    res.redirect('/')
  })
})