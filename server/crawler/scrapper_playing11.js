var jsdom = require("jsdom");
var fs = require("fs");
var jquery = fs.readFileSync("./temp.js", "utf-8");

var db_url = 'mongodb://localhost:27017/IPL';
var teams_id =["team_346", "team_345", "team_255", "team_65", "team_63", "team_62", "team_61", "team_59"];
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
var fullnames ={
	RPS: "Rising Pune Supergiant",
	GL: "Gujarat Lions",
	SRH: "Sunrisers Hyderabad",
	KXIP: "Kings XI Punjab",
	KKR: "Kolkata Knight Riders",
	MI: "Mumbai Indians",
	DD: "Delhi Daredevils",
	RCB: "Royal Challengers Bangalore"
}

Object.prototype.getKeyByValue = function( value ) {
    for( var prop in this ) {
        if( this.hasOwnProperty( prop ) ) {
             if( this[ prop ] === value )
                 return prop;
        }
    }
}

var IPL_Schedule = [];
jsdom.env({
  url: "http://www.cricbuzz.com/cricket-full-commentary/18121/srh-vs-rcb-1st-match-indian-premier-league-2017",
  scripts: ["http://code.jquery.com/jquery.js"],
  done: function (err, window) {
    var $ = window.$;
    
  }
});

