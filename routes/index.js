var express = require('express');
var router = express.Router();

var Cart = require('../models/cart');
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
  var cart = new Cart(req.session.cart ? req.session.cart : { items: {} });

  Product.findById(productId, function(err, product) {
    if (err) {
      res.redirect('/');
    }
    cart.add(product, product.id);
    req.session.cart = cart;
    console.log(req.session.card);
    res.redirect('/');
  });
});

router.get('/shopping-cart', function(req, res, next) {
  var params = {};

  if (req.session.cart) {
    var cart = new Cart(req.session.cart);
    params.products = cart.generateArray();
    params.totalPrice = cart.totalPrice;
  }

  res.render('shop/shopping-cart', params);
})

router.get('/checkout', function(req, res, next) {
  if (!req.session.cart) { 
    return res.redirect('/shopping-cart');
  }

  var cart = new Cart(req.session.cart);  
  res.render('shop/checkout', { total: cart.totalPrice });
});

module.exports = router;
