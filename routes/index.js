var express = require('express');
var router = express.Router();

var Card = require('../models/card');
var Product = require('../models/product');

/* GET home page. */
router.get('/', function(req, res, next) {
  Product.find(function(err, docs) {
    var productChunks = [];
    var chunkSize = 3;
    for (var i = 0; i < docs.length; i += chunkSize) {
        productChunks.push(docs.slice(i, i + chunkSize));
    }
    res.render('shop/index', { title: 'Shopping Cart', products: productChunks });
  });
});

router.get('/add-to-cart/:id', function(req, res, next) {
  var productId = req.params.id;
  var card = new Card(req.session.card ? req.session.card : { items: {} });

  Product.findById(productId, function(err, product) {
    if (err) {
      res.redirect('/');
    }
    card.add(product, product.id);
    req.session.card = card;
    console.log(req.session.card);
    res.redirect('/');
  });
});

module.exports = router;
