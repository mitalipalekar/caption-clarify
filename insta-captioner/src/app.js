const koa = require('koa');
const route = require('koa-route');
const bodyParser = require('koa-bodyparser');
const getCaption = require('./routes/getCaption');

const PORT = 3102;

let app = koa();

app.use(function*(next){
	this.set('Access-Control-Allow-Origin', '*');
    this.set('Access-Control-Allow-Methods', 'POST, GET, OPTIONS')
    yield next;
})

app.use(bodyParser());
app.use(route.get('/captioner/caption', getCaption));

if (!module.parent) {
	const start = () => {
		app.listen(PORT, () => {
			console.log('listening on port', PORT);
		});
	}
	start();
}

module.exports = app;