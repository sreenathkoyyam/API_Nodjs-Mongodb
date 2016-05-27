//referance for mongodb
var mongoose = require('mongoose');
//schema referance comming from mongodb
Schema = mongoose.Schema;

//define Schema
var bookModel = new Schema({
title : {
	type : String,
	default : null

},
author :{type:String,default :false},
genre  :{type:String},
read : {type :Boolean,
         default :false
 }

});

module.exports=mongoose.model('Book',bookModel);