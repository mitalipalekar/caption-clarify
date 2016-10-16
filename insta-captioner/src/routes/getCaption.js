const fs = require('fs');
const sqlite3 = require('sqlite3').verbose();
const clarifai = require('clarifai');
const Promise = require('bluebird');
//const getMoodQuotes = require('./getMoodQuotes');

//const file = process.env.CLOUD_DIR + '/' _ 'test.db';

function* getCaption() {
	let json = this.request.body;
	console.log(json.imageURL);
	this.body = 'ok';
	this.status = 200;
	
	const app = new Clarifai.App(
		'bYzCnxBuFjCnWxguqTAsQLOpTyfBZQPT8l6vIBXE',
		'ErHG-l_1gCgI3JjtV6VutSN0aimQPk1mYyTzJYI9'
	);

	app.getToken();
	let words = {};
	if (json.imageURL) {
		yield app.models.predict(Clarifai.GENERAL_MODEL, json.imageURL).then(
			function(response) {
				let imageData = response.data.outputs[0].data.concepts;

				for(let i = 0; i < imageData.length; i++) {
					let info = imageData[i];
					words[info.name] = info.value;
				}
			},
			function(err) {
				console.log(err);
				throw err;
			}
		);
	} else if (json.imageLocal) {
		//stream bytes from local image
		//let bytes = streamedBytes();
		// let stream = fs.createReadStream(json.imageLocal);
		// let image;
		// stream.on('readable', function() {
		// 	let data = stream.read();
		// 	if (data != null) {
		// 		image += data;
		// 	}
		// });

		// stream.on('end', function() {
		// 	app.models.predict(Clarifai.GENERAL_MODEL, {base64: image}).then(
		// 		function(response) {
		// 			console.log(response);
		// 		},
		// 		function(err) {
		// 			throw err;
		// 		}
		// 	);
		// })

		// stream.on('error', function(err) {
		// 	throw err;
		// })
	} else {
		throw new Error('Need image location');
	}

	console.log(words);


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

module.exports = getCaption;


