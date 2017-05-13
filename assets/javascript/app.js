var queryURL = "http://jservice.io/api/clues";
var trivia = []
var correctAnswer = []
var closeAnswer = ["Arbor Day", "The Eastern Conference", "Prostitute", "The Biography of Leonard Nimoy", "peacock and crocodile", "The Painted Bird", "Iowa", "Woman", "Coopers", "Mission Impossible", "Oh Suzanna"];
var lameAnswer = ["November Solstice", "The Eastern Division", "Skullery Maid", "Picard's Rescue", "willoughby and koala", "Tess", "New Hampshire", "Lefty", "Keepers", "Tropic Thunder", "Clementine"];
var dumbAnswer = ["Taco Tuesday", "The Peach Bowl", "Chorus Girl", "The Final Frontier", "jackalope and jaberwock", "A Clockword Orange", "Ohio", "Arab", "Peepers", "The Scientology Center", "I'll Go A' Ramblin"];
var win = 0;
var lose = 0;

$.ajax({
    url: queryURL,
    method: "GET"
}).done(function(response) {

    for (i = 0; i <= response.length - 1; i++) {

        trivia.push(response[i].question);
    }

    for (k = 0; k <= response.length - 1; k++) {

        correctAnswer.push(response[k].answer);
    }

});


window.onload = function() {
    $("#lap").on("click", stopwatch.recordLap);
    $(".stop").on("click", stopwatch.stop);
    $("#reset").on("click", stopwatch.reset);
    $("#start").on("click", stopwatch.start);
    $("#start").on("click", triviaPlay.newQuestion);

newQuestion();

};

var intervalId;

var stopwatch = {

    time: 30,

    start: function() {

        intervalId = setInterval(stopwatch.count, 1000);
    },
    stop: function() {

        clearInterval(intervalId);
    },

    count: function() {


        stopwatch.time--;

        $("#display").html(":" + stopwatch.time);
    }
};

var triviaPlay = {

    newQuestion: function() {

        var rando = Math.floor(Math.random() * (11 + 1));

        $("#bigQuestion").html(trivia[rando]);

        var answer = correctAnswer[rando];

        if (answer.length <= 8) {

            $("#a").html("  " + correctAnswer[rando]);
            $("#b").html("  " + lameAnswer[rando]);
            $("#c").html("  " + closeAnswer[rando]);
            $("#d").html("  " + dumbAnswer[rando]);

            $("#a").on("click", triviaPlay.win);
            $("#b").on("click", triviaPlay.lose);
            $("#c").on("click", triviaPlay.lose);
            $("#d").on("click", triviaPlay.lose);
        };

        if (answer.length > 8 && answer.length <= 15) {

            $("#b").html("  " + correctAnswer[rando]);
            $("#c").html("  " + lameAnswer[rando]);
            $("#d").html("  " + closeAnswer[rando]);
            $("#a").html("  " + dumbAnswer[rando]);


            $("#b").on("click", triviaPlay.win);
            $("#c").on("click", triviaPlay.lose);
            $("#d").on("click", triviaPlay.lose);
            $("#a").on("click", triviaPlay.lose);
        };

        if (answer.length > 15 && answer.length <= 20) {

            $("#d").html("  " + correctAnswer[rando]);
            $("#a").html("  " + lameAnswer[rando]);
            $("#b").html("  " + closeAnswer[rando]);
            $("#c").html("  " + dumbAnswer[rando]);


            $("#d").on("click", triviaPlay.win);
            $("#a").on("click", triviaPlay.lose);
            $("#b").on("click", triviaPlay.lose);
            $("#c").on("click", triviaPlay.lose);


        }

        if (answer.length > 20) {
            $("#c").html("  " + correctAnswer[rando]);
            $("#d").html("  " + lameAnswer[rando]);
            $("#a").html("  " + closeAnswer[rando]);
            $("#b").html("  " + dumbAnswer[rando]);

            $("#c").on("click", triviaPlay.win);
            $("#d").on("click", triviaPlay.lose);
            $("#a").on("click", triviaPlay.lose);
            $("#b").on("click", triviaPlay.lose);
        };
    },


    win: function() {

        win++;
        $("#title").html("<img class='img-responsive' id='clara' src='../TriviaGame/assets/images/Clarabarton.jpg' alt='Image'/>");
        $("#questions").css("visibility", "hidden");

        var timeVar;
        setTimeout(function() {
            triviaPlay.reset();
        }, 2000);
          clearTimeout(myVar);

    },

    lose: function() {

        lose++;
        $("#title").html("<img class='img-responsive' id='mrsWard' src='../TriviaGame/assets/images/Mrs_Wardroper.jpg' alt='Image'/>");
        $("#questions").css("visibility", "hidden");
        var timeVar;
        timeVar=setTimeout(function() {
            triviaPlay.reset();
        }, 2000);
          clearTimeout(myVar);

    },

    reset: function() {
        $("#mrsWard").remove()
        $("#clara").remove()
        $("#questions").css("visibility", "visible");
        $("#questions").html(triviaPlay.newQuestion);

        stopwatch.time = 30;
        $("#display").html(":30");
        stopwatch.start();

    }

};
