// Function that handle the reading of files and merge in value
	//read from file and get a string
		// merge values into string
var fs = require("fs");

function mergeValues(values, content) {
	// Cycle over the keys
	for(var key in values) {
		// Replace all {{keys}} with the value from the values object
		content = content.replace("{{" + key + "}}", values[key]);
	}
		// return merged content
		return content;
}

export function view(templateName, values, res) {
	var fileContents = fs.readFileSync('./views/' + templateName + '.html', {encoding: "utf8"});
	// Insert values in the content
	fileContents = mergeValues(values, fileContents);
	//Write the content to the response
	res.write(fileContents);
}

(ssd) => {

}

const merhgdfhf = (dssf) => {

}