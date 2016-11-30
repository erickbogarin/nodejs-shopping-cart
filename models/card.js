 function Card(oldCard) {
    this.items = oldCard.items || {};
    this.totalQty = oldCard.totalQty || 0;
    this.totalPrice = oldCard.totalPrice || 0;
}

Card.prototype.add = function(item, id) {
  var storedItem = this.items[id];

  // in case an item has not yet been added to the cart
  if (!storedItem) {
    storedItem = this.items[id] = { item: item, qty: 0, price: 0 };
  }

  storedItem.qty++;
  storedItem.price = storedItem.item.price * storedItem.qty;
  this.totalQty++;
  this.totalPrice += storedItem.item.price;
}

Card.prototype.generateArray = function() {
  var arr = [];

  for (var id in this.items) {
    arr.push(this.items[i]);
  }
  
  return arr;
}

module.exports = Card;
