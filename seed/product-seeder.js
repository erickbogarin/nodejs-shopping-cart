var Product = require('../models/product');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/shopping');

mongoose.connection.on('connected', function() {
	console.log('Conectado ao MongoDB')
});

mongoose.connection.on('error', function(error) {
    console.log('Erro na conexão: ' + error);
});    

var products = [
    new Product({
        imagePath: 'https://upload.wikimedia.org/wikipedia/en/5/5e/Gothiccover.png',
        title: 'Gothic Video Game',
        description: 'Awesome Game!',
        price: 10
    }),
    new Product({
        imagePath: 'http://blogs-images.forbes.com/scottmendelson/files/2016/06/Warcraft-Poster.jpg',
        title: 'World of Warcraft Video Game',
        description: 'Also awesome? But of course it was better in vannila...',
        price: 20
    }),
    new Product({
        imagePath: 'https://upload.wikimedia.org/wikipedia/en/8/8d/Dark_Souls_Cover_Art.jpg',
        title: 'Dark Souls 3 Video Game',
        description: 'I died!',
        price: 50
    })
];

var done = 0;
for(var i = 0 ; i < products.length ; i++) {
    products[i].save(function(err, result){        
        done++;
        if(done === products.length ) {
            exit();     
        }
    });
}

function exit() {
    mongoose.disconnect();
}