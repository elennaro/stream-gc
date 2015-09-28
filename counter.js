// Setup a custom readable
var Readable = require('stream').Readable;

function Counter(opt) {
	Readable.call(this, opt | {objectMode: false});
	this._max = 1000000; // Maximum number of records to generate
	this._index = 1;
}
require('util').inherits(Counter, Readable);

// Override internal read
// Send dummy objects until max is reached
Counter.prototype._read = function counterRead() {
	this._index++;
	if (this._index > this._max) {
		this._index = 0;
		console.log("DONE");
		return this.push(null);
	} else {
		if(this._index%10000 === 0){
			console.log("done ", this._index, this._index/10000 + "%");
		}
		this.push(JSON.stringify({
			foo: this._index,
			bar: this._index * 10,
			hey: 'dfjasiooas' + this._index,
			dude: 'd9h9adn-09asd-09nas-0da' + this._index
		}));
	}
};

module.exports = Counter;

