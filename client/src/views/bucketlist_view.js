const BlistView = function () {
  this.blists = [];
}

BlistView.prototype.addItem = function (item) {
  this.blists.push(item);
  this.render(item);
};

BlistView.prototype.render = function (item) {
  const ul = document.getElementById('blist');
  const li = document.createElement('li');
  const text = document.createElement('p');
  text.innerText = `${item.country} - ${item.activity}`;
  li.appendChild(text);
  ul.appendChild(li);
};

module.exports = BlistView;
