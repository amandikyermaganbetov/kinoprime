var mongoose =require('mongoose');

var Post = mongoose.Schema({
	author: String,
	name: String,
	content: String,
	});

module.exports = mongoose.model('Post',Post);