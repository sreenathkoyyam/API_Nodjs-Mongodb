var express = require('express');

var routes = function(Book){
//bookRouter defineing
var bookRouter=express.Router();
var bookController = require('../Controllers/bookController')(Book)
//bookRouter
//bookRouter.route('/Books')
bookRouter.route('/')
//.post method
.post(bookController.post)
//.get method
.get(bookController.get);

//bookId route

bookRouter.use('/:bookId', function(req,res,next){

	Book.findById(req.params.bookId,function (err,book) {
		if(err)
			//console.log(err);
		res.status(500).send(err);
		else if (book) {
			//console.log('dss================');
			req.book=book;
			next();
		}
		else
			{   res.status(404).send('no book found');
					}
		// body...
	});


});

bookRouter.route('/:bookId')

//.get method
.get(bookController.getId)
//put method
.put(function (req,res) {

	// body...
 		req.book.title=req.body.title;
 		req.book.author=req.body.author;
 		req.book.genre=req.body.genre;
 		req.book.read=req.body.read;

 			req.book.save(function(err){
			if(err)
			//console.log(err);
		res.status(500).send(err);
		else
		{
			res.json(req.book);
		}
	});
		// body...


})

.patch(function (req,res) {
	// body...
//if(req.body.title){req.book.title=req.book.title}
//deleting id from the data set
if(req.body._id)
	delete req.body._id;
for(var p in req.body)
{
	req.book[p]=req.body[p];
}
req.book.save(function(err){
			if(err)
			//console.log(err);
		res.status(500).send(err);
		else
		{
			res.json(req.book);
		}
	});
})

.delete(function(req,res){

req.book.remove(function (err) {
		if(err)
			//console.log(err);
		res.status(500).send(err);
		else
		{
			res.status(204).send('Removed');
		}
});

});

return bookRouter;
};

module.exports=routes;