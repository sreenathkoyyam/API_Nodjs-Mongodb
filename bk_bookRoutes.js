var express = require('express');

var routes = function(Book){
//bookRouter defineing
var bookRouter=express.Router();
//bookRouter
//bookRouter.route('/Books')
bookRouter.route('/')
//.post method
.post(function(req,res) {
		// body...
		var book = new Book(req.body);
		console.log(book);
		book.save();
		res.status(201).send(book);

})

//.get method
.get(function(req,res) {
	// body...
	//var responseJson={hello:"This is my api"};
	//filter the querry by search keyword
	var query={};
	if (req.query.genre) {
		query.genre=req.query.genre;
	}
	Book.find(query,function (err,books) {

		if(err)
			//console.log(err);
		res.status(500).send(err);
		else
			res.json(books);
		// body...
	});
	//res.json(responseJson);
});


bookRouter.route('/:bookId')

//.get method
.get(function(req,res) {
	// body...
	Book.findById(req.params.bookId,function (err,book) {

		if(err)
			//console.log(err);
		res.status(500).send(err);
		else
			res.json(book);
		// body...
	});
	//res.json(responseJson);
})
//put method
.put(function (req,res) {

	// body...
Book.findById(req.params.bookId,function (err,book) {

		if(err)
			//console.log(err);
		res.status(500).send(err);
		else
 		book.title=req.body.title;
 		book.author=req.body.author;
 		book.genre=req.body.genre;
 		book.read=req.body.read;

 			book.save();
			res.json(book);
		// body...
	});

});

return bookRouter;
};

module.exports=routes;