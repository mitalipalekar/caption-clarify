const sqlite3 = require('sqlite3').verbose();
const file = process.env.CLOUD_DIR + '/' + 'database.db';

//function getMoodQuotes(mood) {
	var mood = 'Friendship';
	var quotes = [];

	var db = new sqlite3.Database('../database.db');
	//console.log("Database Creation worked");
	db.all('SELECT q.content FROM Quotes q JOIN Categories c ON q.category = c.id AND c.name = \'' + mood + '\'', function(err, rows) {
		console.log("database thing entered");
		rows.forEach(function (row) {  
	       quotes.push(row.content);  
	    })
	    console.log(quotes.toString());
	});
	db.close();
//}
