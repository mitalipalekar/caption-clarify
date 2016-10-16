const fs = require('fs');
const sqlite3 = require('sqlite3').verbose();
const clarifai = require('clarifai');
const Promise = require('bluebird');
const base64 = require('node-base64-image');
const querystring = require('querystring');
const emoji = require('emoji-from-word');
const emojiImage = require('emojis');
const path = require('path');

function* getCaption() {
	let json = querystring.parse(this.querystring);
	this.body = 'ok';
	this.status = 200;
	
	const app = new Clarifai.App(
		'bYzCnxBuFjCnWxguqTAsQLOpTyfBZQPT8l6vIBXE',
		'ErHG-l_1gCgI3JjtV6VutSN0aimQPk1mYyTzJYI9'
	);

	app.getToken();
	let words = {};
	let hashtags = [];
	let emojis = [];
	if (json.imageURL) {
		yield app.models.predict(Clarifai.GENERAL_MODEL, json.imageURL).then(
			function(response) {
				let imageData = response.data.outputs[0].data.concepts;

				for(let i = 0; i < imageData.length; i++) {
					let info = imageData[i];
					words[info.name] = info.value;
					if (info.value >= 0.9) {
						hashtags.push('#' + info.name);
						emojis.push(emoji(info.name).toString());
					}
				}
			},
			function(err) {
				throw err;
			}
		);
	} else if (json.imageLocal) {
		base64.encode(json.imageLocal, {string: true}, function(err, res) {
			console.log(res);
			app.models.predict(Clarifai.GENERAL_MODEL, {base64: res}).then(
				function(response) {
					let imageData = response.data.outputs[0].data.concepts;

					for(let i = 0; i < imageData.length; i++) {
						let info = imageData[i];
						words[info.name] = info.value;
					}
				},
				function(err) {
					throw err;
				}
			);
		});

		// let stream = fs.createReadStream(json.imageLocal);
		// let image;
		// stream.on('readable', function() {
		// 	let data = stream.read();
		// 	if (data != null) {
		// 		image += data;
		// 	}
		// });

		// stream.on('end', function() {
		// 	console.log(image);
			// app.models.predict(Clarifai.GENERAL_MODEL, {base64: image}).then(
			// 	function(response) {
			// 		let imageData = response.data.outputs[0].data.concepts;

			// 		for(let i = 0; i < imageData.length; i++) {
			// 			let info = imageData[i];
			// 			words[info.name] = info.value;
			// 		}
			// 	},
			// 	function(err) {
			// 		throw err;
			// 	}
			// );
		// })

		// stream.on('error', function(err) {
		// 	throw err;
		// })
	} else {
		throw new Error('Need image location');
	}

	const file = process.env.CLOUD_DIR + '/' + 'database.db';

	let quotes = [];

	let db = new sqlite3.Database(path.resolve('../database.db'));
	//console.log("Database Creation worked");
	db.all('SELECT q.content FROM Quotes q JOIN Categories c ON q.category = c.id AND c.name = \'' + json.mood + '\'', function(err, rows) {
		console.log("database thing entered");
		rows.forEach(function (row) {  
			console.log(row.content);
	       quotes.push(row.content);  
	    })
	});
	db.close();

	//console.log(words);
	//console.log(hashtags);
	//console.log(emojis);
	console.log(quotes.toString());
	this.body = {
		"captions": quotes,
		"emojis": emojis,
		"hashtags": hashtags
	}

}

module.exports = getCaption;


