var jsdom = require("jsdom")
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

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
	var jsdom = require("jsdom");

jsdom.env({
  url: "http://www.cricbuzz.com/cricket-series/2568/indian-premier-league-2017/matches",
  scripts: ["http://code.jquery.com/jquery.js"],
  done: function (err, window) {
    var $ = window.$;
    //console.log("HN Links");
    $("#series-matches > div").slice(2).each(function() {
 // month date day      //console.log($(this).children('div').eq(0).text())
        $(this).children('div').eq(2).children('div').eq(0).children().each(function(){
            if($(this).prop('tagName').toUpperCase() === "A"){
        console.log("http://www.cricbuzz.com"+$(this).attr('href'));
        console.log($(this).text());  
            }
	if($(this).prop('tagName').toUpperCase() === "DIV"){
        console.log($(this).text());
    
            }            
        
        })
    });
  }
});
