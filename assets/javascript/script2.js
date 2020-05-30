
// Initialize Firebase
var config = {
  apiKey: "AIzaSyCgG_gbaQ8F7QLrN4RvZse3d62OgBmKoyU",
  authDomain: "group-project-1-ba68c.firebaseapp.com",
  databaseURL: "https://group-project-1-ba68c.firebaseio.com",
  projectId: "group-project-1-ba68c",
  storageBucket: "group-project-1-ba68c.appspot.com",
  messagingSenderId: "495056447741",
  appId: "1:495056447741:web:32658de81b8b1697f7f694",
  measurementId: "G-ELMHRP194B"
};

firebase.initializeApp(config);

var database = firebase.database();


//TIMER
$(".startBtn").on("click", start);
$(".pauseBtn").on("click", stop);
$(".stopBtn").on("click", recordSession);
$(".stopBtn").on("click", stop);
$(".stopBtn").on("click", reset);


var intervalId;

var clockRunning = false;
var time = 0;
var lap = 1;

function start() {

// DONE: Use setInterval to start the count here and set the clock to running.
if (!clockRunning) {
  intervalId = setInterval(count, 1000);
  clockRunning = true;
}
}



function stop() {

// DONE: Use clearInterval to stop the count here and set the clock to not be running.
clearInterval(intervalId);
clockRunning = false;    
}


function reset() {

time = 0;
lap = 1;

// DONE: Change the "display" div to "00:00."
$("#display").text("00:00");

}

function recordSession() {

// DONE: Get the current time, pass that into the timeConverter function,
//       and save the result in a variable.
var converted = timeConverter(time);

database.ref().push({
  time: converted,
  dateAdded: firebase.database.ServerValue.TIMESTAMP
});


// DONE: Add the current lap and time to the "laps" div.
$("#lastSession").append("<p>Session: " + lap + " : " + converted + "</p>");

// DONE: Increment lap by 1. Remember, we can't use "this" here.
lap++;

}

database.ref().on("child_added", function(snapshot) {
console.log("Session Time Recorded: " + snapshot.val().time);
$("#sessions").append("<p> Duration: " + snapshot.val().time + "</p>");

}, function(errorObject) {
console.log("Errors handled: " + errorObject.code);
});


function count() {

// DONE: increment time by 1, remember we cant use "this" here.
time++;

// DONE: Get the current time, pass that into the timeConverter function,
//       and save the result in a variable.
var converted = timeConverter(time);


// DONE: Use the variable we just created to show the converted time in the "display" div.
$("#display").text(converted);
}

function timeConverter(t) {

var minutes = Math.floor(t / 60);
var seconds = t - (minutes * 60);

if (seconds < 10) {
  seconds = "0" + seconds;
}

if (minutes === 0) {
  minutes = "00";
}
else if (minutes < 10) {
  minutes = "0" + minutes;
}

return minutes + ":" + seconds;
}
//END OF TIMER

// TABLE




// Random Quotes Starts Here

function quote() {
$.ajax({
  url: "https://api.forismatic.com/api/1.0/",
  jsonp: "jsonp",
  dataType: "jsonp",
  data: {
    method: "getQuote",
    lang: "en",
    format: "jsonp"
  },
  success: function(response) {
    $('#quote').html(response.quoteText)
    $('#author').html("<br/>&dash; " + response.quoteAuthor)
  }
});
}
$("#quoteButton").on("click", function() {
$("#home").css("height", "725px");
quote();
});

// Random quotes Ends Here

// music api

// MUSIC

// Music Starts Here

function Music() {

  var Lastfm = require('simple-lastfm');

  var lastfm = new Lastfm({
	api_key: '95300f73d09bc711f171458d30ce2250',
	api_secret: '73d7dd5bb5350d8184e237714398f498',
	username: 'swissbizz',
	password: 'Venom2099@!!',
	authToken: 'xxx' // Optional, you can use this instead of password, where authToken = md5(username + md5(password))
});

lastfm.getSessionKey(function(result) {
	console.log("session key = " + result.session_key);
	if(result.success) {
		lastfm.scrobbleNowPlayingTrack({
			artist: 'Ratatat',
			track: 'Seventeen Years',
			callback: function(result) {
				console.log("in callback, finished: ", result);
			}
		});
		lastfm.scrobbleTrack({
			artist: 'Bonobo',
			track: 'Black Sands',
			callback: function(result) {
				console.log("in callback, finished: ", result);
			}
		});
		lastfm.loveTrack({
			artist: 'Electrelane',
			track: 'Suitcase',
			callback: function(result) {
				console.log("in callback, finished: ", result);
			}
		});
		lastfm.unloveTrack({
			artist: 'something crap',
			track: 'no thanks',
			callback: function(result) {
				console.log("in callback, finished: ", result);
			}
		});
	} else {
		console.log("Error: " + result.error);
  }
  
  $.ajax(settings).done(function (response) {
    console.log(response);
  });

  $.ajax({
    url: "/2.0/?method=library.getartists&api_key=95300f73d09bc711f171458d30ce2250&user=swissbizz&format=json",
    jsonp: "jsonp",
    dataType: "jsonp",
    data: {
      method: "getSong",
      lang: "en",
      format: "jsonp"
    },
    success: function(response) {
      $('#song').html(response.playSong)
      $('#artist').html("<br/>&dash; " + response.playSong)
    }
  });
  },
  $("#musicButton").on("click", function() {
  Music();  
}
  
  // Random quotes Ends Here

//END OF MUSIC



// CHART

//changed the chart to be minutes so that we could see the changes during the demo

require(['moment', 'chartjs'], function(moment, Chart) {
  const CHART = document.getElementById("myChart");

  Chart.defaults.scale.ticks.beginAtZero = true;

  let barChart = new Chart(CHART,{

      type: 'bar',
      data: {
          labels: ["Hour 1 ", "Hour2 ", "Hour 3 ", "Hour 4 ", "Hour 5 ", "Hour 6 ", "Hour 7 ", "Hour 8 ", "Hour 9 ", "Hour 10", "Hour 11", "Hour 12", "Hour 13", "Hour 14", "Hour 15", "Hour 16", "Hour 17", "Hour 18", "Hour 19", "Hour 20", "Hour 21", "Hour 22", "Hour 23", "Hour 24"],
          datasets: [{
              label: 'Hours Per Day',
              backgroundColor: '#b2c7c8',
              data: [12, 25, 16, 10, 7, 4, 30, 19, 2, 20, 16, 23, 11, 28, 13, 15, 14, 22]

          }]
      }

  });

  //retrieve the saved times from the database
  database.ref("/allTime").on("child_added", function(snapshot){
//add every saved value you find in the database and add them to the addedtime variable
    addedTime += snapshot.val().time;
//send the sum, to the chart
    addData(barChart, 19, addedTime);
    console.log("This is the value of addedTime when we send it to chart: " + addedTime);

  });

// this takes whatever you want to send to the chart and then updates the chart
// in this case we want the sum of all the time in the database "addedTime"
// got this idea from http://www.chartjs.org/docs/latest/developers/updates.html
// got the splice syntax from https://devdocs.io/javascript/global_objects/array/splice

  function addData(chart, day, newData) {
//we are picking one specific week in the chart, and replacing it with newData
  chart.data.datasets[0].data.splice(9, 1, newData);
  chart.update();
}

//END OF CHART


// Random Quotes Starts Here

function quote() {
$.ajax({
  url: "https://api.forismatic.com/api/1.0/",
  jsonp: "jsonp",
  dataType: "jsonp",
  data: {
    method: "getQuote",
    lang: "en",
    format: "jsonp"
  },
  success: function(response) {
    $('#quote').html(response.quoteText)
    $('#author').html("<br/>&dash; " + response.quoteAuthor)
  }
});
}
$("#quoteButton").on("click", function() {
quote();
});

// Random quotes Ends Here
