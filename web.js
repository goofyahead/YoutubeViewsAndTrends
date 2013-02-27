
define (['fs','underscore','text!templates/plain.html','jquery',], function (fs, _, template, $){
	var Web = function Web(){

		this.draw = function (req,res, file){
			var elements = [];
			var file = req.params.file;
			fs.readFile('data/'+ file , 'utf8', function (err, data) {
			  if (err) throw err;
			  var arraySplited = data.split('//');
			  
			  for (elem in arraySplited) {
			  	var currentArray = arraySplited[elem].split(':');
			  	if (currentArray[0]){
			  	var newObject = {};
				  	newObject.date = parseInt(currentArray[0]);
				  	newObject.value = parseInt(currentArray[1]);
				  	elements.push(newObject);
			 	}
			  }
		  
		  res.send(_.template(template, {datas : JSON.stringify(elements)}));
		});
	};

};

	return Web;
});

