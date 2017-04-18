var jsdom = require("jsdom")
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var jsdom = require("jsdom");

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



//test.getKeyByValue( 42 );
var IPL_Schedule = [];
jsdom.env({
  url: "http://www.cricbuzz.com/cricket-series/2568/indian-premier-league-2017/matches",
  scripts: ["http://code.jquery.com/jquery.js"],
  done: function (err, window) {
    var $ = window.$;
    //console.log("HN Links");
    $("#series-matches > div").slice(2).each(function() {
    	var fixture = {}
 // month date day      //console.log($(this).children('div').eq(0).text())
 		var extractedDate = $(this).children('div').eq(0).text()
 		if(extractedDate && extractedDate.length >0){
 			var fTime = extractedDate.split(', ');
 			fTime_month = fTime[0].trim().split(" ");
 			fTime_day = parseInt(fTime[0].replace(/[^0-9]/g, '').trim());
 			fTime_month = fTime_month[0]; 
 			console.log(fTime);
 			fTime_weekDay = fTime[1];
 			fTime_year = 2017;  
 			
 			fixture.extractedDate = extractedDate; 
        	
 		}
 		$(this).children('div').eq(2).children('div').eq(0).children().each(function(){
            
            if($(this).prop('tagName').toUpperCase() === "A"){
            	
            	if($(this).text().indexOf('won')==-1){
			        fixture.cricbuzzURL = "http://www.cricbuzz.com"+$(this).attr('href');
			       // console.log("http://www.cricbuzz.com"+$(this).attr('href'));
			        if($(this).text().indexOf(" vs ")!=-1){
				        var str = $(this).text().split(", ");
				        var playingTeams = str[0].split(" vs ")
				        fixture.homeTeam =  fullnames.getKeyByValue(playingTeams[0].trim());
				        //console.log(playingTeams[0] +" vs "+ playingTeams[1])
				        fixture.awayTeam =  fullnames.getKeyByValue(playingTeams[1].trim());
				        fixture.matchNo = parseInt(str[1].replace(/[^0-9]/g, '').trim());     
	            	}
            	}else{
            		fixture.result = $(this).text().split(" won")[0].trim();
            	}
       		 }
			if($(this).prop('tagName').toUpperCase() === "DIV"){
		        var loc = $(this).text().split(', ');
		        fixture.stadium = loc[0].trim();
		        fixture.city = loc[1].trim();
		    
		    }            
        
        })
		IPL_Schedule.push(fixture);
    });


    for(var i =0;i<IPL_Schedule.length;i++){
    	if(i<IPL_Schedule.length-1){
    		var current = IPL_Schedule[i];
    			next = IPL_Schedule[i+1];
    		if(next.extractedDate === current.extractedDate)
    			current.time = "4PM IST";
    		else
    			current.time = "8PM IST";
    	}else{
    		current.time = "8PM IST";
    	}
    	console.log(IPL_Schedule[i])

    }
    	
	//for(fixture in IPL_Schedule){
	//	console.log(fixture.homeTeam() +" vs "+fixture.awayTeam)
	//}
  }
});

