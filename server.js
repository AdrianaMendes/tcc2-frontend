/* eslint-disable @typescript-eslint/no-var-requires */
const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');

// Run the app by serving the static files
// in the dist directory

app.use(cors());
app.use(express.static(__dirname + '/dist/app-frontend-angular'));

// For all GET requests, send back index.html
// so that PathLocationStrategy can be used

app.get('/*', function (req, res) {
	res.sendFile(path.join(__dirname + '/dist/app-frontend-angular/index.html'));
});

// Start the app by listening on the default
// Heroku port

app.listen(process.env.PORT || 8080);
