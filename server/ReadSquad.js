var tesseract = require('node-tesseract');

// Recognize text of any language in any format
tesseract.process('images/image.png',function(err, text) {
	if(err) {
		console.error(err);
	} else {
		console.log(text);
	}
});