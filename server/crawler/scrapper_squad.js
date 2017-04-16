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
	jsdom.env({
	  url: "http://www.cricbuzz.com/cricket-series/2568/indian-premier-league-2017/squads",
	  scripts: ["http://code.jquery.com/jquery.js"],
	  done: function (err, window) {
	    var $ = window.$;
	    var teams = [];
	    for(team_id of teams_id){
	    	//console.log(team_id)
	    	var temp = {}; var players =[];
	    	temp.team_id = team_id;
	    	temp.team_name = $('#'+team_id).attr("title");
	    	temp.short_name = shortnames[team_id];
	    	temp.squad = [];
	    	$('#'+team_id).children('a').each(function(){
	    		var player = {}
	    		player.name = $(this).attr('title');
	    		player.url = "http://www.cricbuzz.com"+($(this).attr('href'));
	    		var type_temp_str = $(this).children('small').text().trim().replace('(','').replace(')','');
	    		if(type_temp_str.indexOf(',')==-1)
	    			player.type = type_temp_str;
	    		else{
	    			player.type = type_temp_str.split(',')[1].trim();
	    			player.captain = true;
	    			temp.captain = player.name;
	    		}
	    		player.current_team = temp.short_name;
	    		temp.squad.push(player);
	    		players.push(player);
	    	})

	    	teams.push(temp);
	    }

	    console.log(teams.length)
	    console.log(teams[1])

	    console.log(teams)*/

	   // db code
	   /* MongoClient.connect(db_url, function(err, db){
	    	var col = db.collection('teams');
	    	col.insertMany(teams,function(err, r){
	    		assert.equal(null, err)
	    		//assert.equal(2, r.insertedCount);	    		
	    	})
	    	col = db.collection('players');
	    	col.insertMany(players, function(err,r){
	    		assert.equal(null, err);
	    		db.close();

	    	})
	    })*/
	    }
	});
	


