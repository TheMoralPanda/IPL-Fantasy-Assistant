var tesseract = require('node-tesseract');
var shortnames = {
	team_346 : "RPS",
	team_345 : "GL",
	team_255 : "SRH",
	team_65 : "KXIP",
	team_63 : "KKR",
	team_62 : "MI",
	team_61 : "DD",
	team_59 : "RCB"
}
// Recognize text of any language in any format
tesseract.process('images/image.png',function(err, text) {
	if(err) {
		console.error(err);
	} else {
		
		text = text.replace(/[0-9]/g, '')
		text = text.replace(/(^[ \t]*\n)/gm, "")
		text = text.replace(/,/g , "");
		for(var team in shortnames ){
			
			var find = shortnames[team]
			var re = new RegExp(find, 'g');

			text = text.replace(re, '');
			
		}
		console.log(text);

	}
});