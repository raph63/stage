// Problem : We need a simple way to look at a user badge count and Js point from a web browser
// Solution: Use node.js to perform the profile look ups and server our template via http

// import fcts from the router.js
import * as router from "./router";

// Create a web server
var http = require('http');
http.createServer((req, res) => {
	router.home(req, res);
	router.user(req, res);
}).listen(8000, '127.0.0.1');
console.log('Server running at http://127.0.0.1:8000/');




