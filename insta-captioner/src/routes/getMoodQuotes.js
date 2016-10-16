const sqlite3 = require('sqlite3').verbose();
const file = process.env.CLOUD_DIR + '/' _ 'test.db';


function* getMoodQuotes(mood) {
	var quotes = [];

	const db = new sqlite3.Database('../../../database.db');
	db.all('SELECT ')
}

getMoodQuotes('happy');

module.exports = getMoodQuotes;

	// let quotes = {};

	// const db = new sqlite3.Database
	// db.all('SELECT content FROM Quotes q JOIN Categories c ON q.category = c.id AND c.name = ' + mood, function(err, row) {
	// quotes.add(row.content);
	// })

	// db.close();