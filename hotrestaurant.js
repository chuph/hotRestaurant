// Dependencies
// ==================================================================
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

// Set up Express App
// ==================================================================
var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
// ==================================================================
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// Reservations
var reservations= [{
	name: "King Robert",
	phoneNumber: "9723243423",
	email:"gamesstop@hotmail.com",
	id:"20"
}];

var waiting= [{}];
//Basic route that sends the suer to the AJAX page
// ==================================================================
app.get("/",function(req, res) {
	res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/tables", function(req, res) {
	res.sendFile(path.join(__dirname, "tables.html"));
});

app.get("/reservations", function(req, res) {
	res.sendFile(path.join(__dirname, "reservations.html"));
});


app.get("/api/:reservation?", function(req, res) {
	var chosen = req.params.reservation;
	if (chosen === "waiting") {
		return res.json(waiting);
	} else return res.json(reservations);
});

//Create new reservations 
app.post("/api/tables", function(req, res) {
	var newRes = req.body;

	console.log(newRes);

	res.json(newRes);
	reservations.push(newRes);

});

// Start the new server to begin listening
// ==================================================================
app.listen(PORT, function() {
	console.log("App is listening on PORT " + PORT);
});