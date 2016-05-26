// Problem :  We need a simple way to look at a user's badge count and JS points

// solution : use Node.js to connect to treehouse's API to get profile information to print out
var https = require("https");
var username = "francismarineau";

function printMessage(username, badgeCount, points) {
	var message = username + " has " + badgeCount + " total badges and " + points + " Points in JS";
	console.log(message);
}


//connect to API URL (http://teamtreehouse.com/username.json)
var request = https.get("https://teamtreehouse.com/" + username + ".json", function(res) {
	var body = "";
  res.on('data', function(chunk) {
    body += chunk;
  });

  res.on('end', () => {
    var profile = JSON.parse(body);
    printMessage(username, profile.badges.length, profile.points.JavaScripts);
  });
});

request.on("error", function(error) {
  console.error(error.message);
});

