const fs = require('fs');
const sqlite3 = require('sqlite3');
const clarifai = require('clarifai');

//const file = process.env.CLOUD_DIR + '/' _ 'test.db';

function* getCaption() {
	let json = this.request.body;
	this.status = 'ok';
	
	console.log(1);
	// const app = new Clarifai.App(
	// 	'bYzCnxBuFjCnWxguqTAsQLOpTyfBZQPT8l6vIBXE',
	// 	'ErHG-l_1gCgI3JjtV6VutSN0aimQPk1mYyTzJYI9'
	// );

	// app.getToken();
	// console.log(2);
	// if (json.imageURL) {
	// 	console.log(3);
	// 	app.models.predict(Clarifai.GENERAL_MODEL, json.imageURL).then(
	// 		function(response) {
	// 			console.log(4);
	// 			console.log(response);
	// 		},
	// 		function(err) {
	// 			throw err;
	// 		}
	// 	);
	// } else if (json.imageLocal) {
	// 	//stream bytes from local image
	// 	//let bytes = streamedBytes();

	// 	app.models.predict(Clarifai.GENERAL_MODEL, {base64: bytes}).then(
	// 		function(response) {
	// 			console.log(response);
	// 		},
	// 		function(err) {
	// 			throw err;
	// 		}
	// 	);
	// }


	//suppose json of the form:
	//json = {
	// 	mood: someMood,
	//	imageURL: someURL,
	//	imageLocal: someLocalPath
	//}

	// let quotes = {};

	// const db = new sqlite3.Database
	// db.all('SELECT content FROM Quotes q JOIN Categories c ON q.category = c.id AND c.name = ' + json.mood, function(err, row) {
	// 	quotes.add(row.content);
	// })

	// db.close();

}