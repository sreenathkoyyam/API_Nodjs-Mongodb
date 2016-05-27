var bookController = function(Book){
// /book
var post = function(req,res) {
		// body...
		//console.log(req);
		var book = new Book(req.body);
		//console.log(book);
if(!req.body.title)
{
res.status(400);
res.send('Title is required');

}
else
{
		book.save();
		res.status(201);
		res.send(book);
}
}

var get =function(req,res) {
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
}
// /book/bookId

var getId =function(req,res) {
	// body...
//console.log(req.book);
			res.json(req.book);
	
	//res.json(responseJson);
}

return{
	post:post,
	get:get,getId
}

}

module.exports = bookController;