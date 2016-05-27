// Problem :  We need a simple way to look at a user's badge count and JS points

// solution : use Node.js to connect to treehouse's API to get profile information to print out

var https = require("https");
var http = require("http");
// Print out message
function printMessage(username, badgeCount, points) {
	var message = username + " has " + badgeCount + " total badges and " + points + " Points in JS";
	console.log(message);
}

// Print out error mess
function printError(error) {
	console.error(error.message);
}

export function get(username) {
	//connect to API URL (http://teamtreehouse.com/username.json)
	var request = https.get("https://teamtreehouse.com/" + username + ".json", function(res) {
		var body = "";
	  res.on('data', function(chunk) {
	    body += chunk;
	  });

	  res.on('end', () => {
	  	if(res.statusCode === 200) {
		    try {
		    	// Parse data
		    	var profile = JSON.parse(body);
		    	// Print data
		    	printMessage(username, profile.badges.length, profile.points.JavaScript);
		  	} catch(error) {
			  	// Parse error 
			  	printError(error);
			  	}
		  } else {
		  	printError({ message: "There was an error getting the profile for " + username + ". (" + http.STATUS_CODES[res.statusCode] + ")" })
		  }
	  });
	});

	// Connection error
	request.on("error", printError);
}
