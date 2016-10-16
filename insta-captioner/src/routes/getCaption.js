const fs = require('fs');
const sqlite3 = require('sqlite3').verbose();
const clarifai = require('clarifai');
const Promise = require('bluebird');
const base64 = require('node-base64-image');
const querystring = require('querystring');

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
	let hashtags = {};
	if (json.imageURL) {
		yield app.models.predict(Clarifai.GENERAL_MODEL, json.imageURL).then(
			function(response) {
				let imageData = response.data.outputs[0].data.concepts;

				for(let i = 0; i < imageData.length; i++) {
					let info = imageData[i];
					words[info.name] = info.value;
					if (info.value >= 0.9) {
						hashtags[i] = '#' + info.name;
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

	console.log(words);
	console.log(hashtags);
	this.body = {
		words,
		hashtags
	}

}

module.exports = getCaption;


