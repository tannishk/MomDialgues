// Mum Favourite Dialogs 
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.json());

var dialgoes = [
    {
        "id": 1,
        "dialgue": "Take Bath"
    },
    {
        "id": 2,
        "dialgue": "Zaban kyo Chalti ha"
    },
    {
        "id": 3,
        "dialgue": "Bhaunk kyo raha ha"
    }
];
app.get("/dialogues", function (request, response) {
    response.send(dialgoes);
});

app.post("/dialogues", function (request, response) {
    var dialgue = request.body;
    if (!dialgue || dialgue === "") {
        response.status(500).send({"error": "Dialogue empty"});
        return;
    }
    dialgoes.push(dialgue);
    response.send({"status": "insertion successful"});
});

app.put("/dialogues/:dialgueId", function (request, response) {
    var dialgueId = parseInt(request.params.dialgueId, 10);
    var dialgueText = request.body.dialgue;
    console.log(dialgueId);
    if (!dialgueText || dialgueText === "") {
        response.status(500).send({"error": "Dialogue empty"});
        return;
    }
    dialgoes.forEach(dialgoe => {
        if (dialgoe.id === dialgueId) {
            dialgoe.dialgue = dialgueText;
            response.send({"response": "alteration success"});
            return;
        }
    });
    response.status(500).send({"error": "Alteration failed as record not found"});
});

app.delete("/dialogues/:dialgueId", function (request, response) {
    var dialgueId = parseInt(request.params.dialgueId, 10);
    console.log(dialgueId);
    dialgoes = dialgoes.filter(dialgue => !(dialgue.id === dialgueId));
    response.send({"response": "deletion success"});
});

app.listen(8081, function () {
    console.log("Starting server at 8081");
});


