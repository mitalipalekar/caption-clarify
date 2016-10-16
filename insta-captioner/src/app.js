const koa = require('koa');
const route = require('koa-route');
const bodyParser = require('koa-bodyparser');
const getCaption = require('./routes/getCaption');

const PORT = 3102;

let app = koa();

app.use(bodyParser());
app.use(route.post('/captioner/caption', getCaption));

if (!module.parent) {
	const start = () => {
		app.listen(PORT, () => {
			console.log('listening on port', PORT);
		});
	}
	start();
}

module.exports = app;