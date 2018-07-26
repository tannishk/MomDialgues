var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

var ingredients = [
	{
		id:"123",
		text:"annu"
	},
	{
		id:"456",
		text:"annu123"
	},
	{
		id:"901",
		text:"annufatass"
	}
];

app.get('/',function(request,response){
	response.send(ingredients);
});
app.post('/',function(request,response){
	var ingredient = request.body;
	if(!ingredient || ingredient.text==""){
		response.status(500).send({error:"Your ingredient must be text"});
	} else{
		ingredients.push(ingredient);
		}
		response.status(200).send("Correct ingredient received");
	});

app.put('/:ingredientId',function(request,response){
	var newId =request.params.ingredientId;
	for(var i=0;i<ingredients.length;i++){
		if(ingredients[i].id===newId){
			ingredients[i].text = request.body.text;
			response.status(200).send("Alteration success");
			return;
		}
	}
	response.status(500).send("Not possible");
});
app.listen(3000,function(){
	console.log('API running on port 3000!');
});
