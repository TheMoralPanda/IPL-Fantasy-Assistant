var jsdom = require("jsdom")
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

var db_url = 'mongodb://localhost:27017/IPL';
var teams =[];

	jsdom.env({
	  url: "http://www.cricbuzz.com/cricket-series/2568/indian-premier-league-2017/squads",
	  scripts: ["http://code.jquery.com/jquery.js"],
	  done: function (err, window) {
	    var $ = window.$;
	    //console.log($("div.list-group.cb-list-group").html());
	    $('div.list-group.cb-list-group > div').each(function () {
	        var temp = {};
	    
	        temp.teamName = $(this).children().eq(0).text().trim().replace(' Squad:','');
	        console.log(temp.teamName)
	        var players = $(this).children().eq(1).text().split(", ");
	        for(var i=0;i<players.length;i++){
	        	console.log(players[i]);
	        	if(players[i].indexOf("(c)")!=-1){
	        		players[i] = players[i].replace("(c)",'');
	        		temp.captain = players[i];
	        	}	        
	        }
	        temp.squad = players;
	        temp.squadLength = players.length; 	
	        //console.log($(this).text());
	        teams.push(temp);
	    });
	    //console.log(teams)
	    //console.log(teams.length)
	    console.log(teams)
	   /* MongoClient.connect(db_url, function(err, db){
	    	var col = db.collection('teams');
	    	col.insertMany(teams,function(err, r){
	    		assert.equal(null, err)
	    		//assert.equal(2, r.insertedCount);
	    		db.close();
	    	})
	    })*/
	    }
	});
	


//console.log($("#fullcommentary  div:nth-of-type(2)  nav div:nth-of-type(3)").children("a").text());