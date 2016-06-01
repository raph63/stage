// Handle the http routes GET / And POST / i.e. Home
// var Profile = require("./profile.js");
import {view} from "./renderer";
import Profile from "./profile";
var querystring = require("querystring");

var commonHeaders = {'Content-Type': 'text/html'}


export function home(req, res) {
	//if url == "/" && GET
	if(req.url === "/") {
		if(req.method.toLowerCase() === "get") {
			//show search field
			res.writeHead(200, commonHeaders);
			view("header", {}, res);
			view("search", {}, res);
			view("footer", {}, res);
			res.end();
		} else {
			// if url == "/" && POST
			req.on("data", (postBody) => {
				var query = querystring.parse(postBody.toString());

				res.writeHead(303, {"Location": "/" + query.username });
				res.end();
			});
		}
	}	
}

// Handle the http route GET / :usermane i.e. /chalkers
export function user(req, res) {	
	// if url== "/ ...."
	var username = req.url.replace("/", "");
	if(username.length > 0) {
		res.writeHead(200, commonHeaders);
		view("header", {}, res);

		var studentProfile = new Profile(username);
		// on "end"
		studentProfile.on("end", (profileJSON) => {
			// Show profile

			//store the values which we need
			var values = {
				avatarUrl: profileJSON.gravatar_url,
				username: profileJSON.profile_name,
				badges: profileJSON.badges.length,
				jsPoints: profileJSON.points.JavaScript
			}
			// Simple res
			view("profile", values, res);
			view("footer", {}, res);
			res.end();
		});

		// on "error"
		studentProfile.on("error", (error) => {
			// Show error
			view("error", {errorMessage: error.message}, res);
			view("search", {}, res);
			view("footer", {}, res);
			res.end();
		});	
	}
}