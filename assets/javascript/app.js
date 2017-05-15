//set global variables

var queryURL = "https://jservice.io/api/clues";
var trivia = []
var correctAnswer = []
var closeAnswer = ["Arbor Day", "The Eastern Conference", "Prostitute", "The Biography of Leonard Nimoy", "peacock and crocodile", "The Painted Bird", "Iowa", "Woman", "Coopers", "Mission Impossible", "Oh Suzanna", "cat-o-nine-tails", "stump speech", "Michael Scott", "judge", "The Man With Two Brains", "Banshee", "an enzyme", "The Torys", "Agganis Arena", "publishers", "Franz", "Virginia Woolf", "Donald Trump"];
var lameAnswer = ["November Solstice", "The Eastern Division", "Skullery Maid", "Picard's Rescue", "willoughby and koala", "Tess", "New Hampshire", "Lefty", "Keepers", "Tropic Thunder", "Clementine", "mace", "soap box", "Greg Maddux", "prosecutor", "Dirty Rotten Scoundrels", "Wombat", "an electron", "Tammany Hall", "TD Garden", "fishermen", "Wolfgang", "Martha", "Herbert Hoover"];
var dumbAnswer = ["Taco Tuesday", "The Peach Bowl", "Chorus Girl", "The Final Frontier", "jackalope and jaberwock", "A Clockword Orange", "Ohio", "Arab", "Peepers", "The Scientology Center", "I'll Go A' Ramblin", "tourret", "road trip", "Sandy Koufax", "public defender", "Dead Men Don't Wear Plaid", "Kimodo Dragon", "a chain reaction", "The Green Party", "Three Rivers Stadium", "architects", "Saglieri", "Cleopatra", "Woodrow Wilson"];
var win = 0;
var lose = 0;
var questionCounter = 0;
//call the query and push the data into arrays

$.ajax({
    url: queryURL,
    method: "GET"
}).done(function(response) {

    for (i = 0; i <= 25; i++) {

        trivia.push(response[i].question);
    }

    for (k = 0; k <= 25; k++) {

        correctAnswer.push(response[k].answer);
    }

});

//create event handlers that run timing functions depending on what's clicked. All answer buttons have the class .stop, which stops timer


window.onload = function() {

    $(".stop").on("click", stopwatch.stop);

    $("#start").on("click", stopwatch.start);

    $("#start").on("click", triviaPlay.newQuestion);

    // newQuestion();

};

var intervalId;

var stopwatch = {

    time: 20,

    start: function() {

        intervalId = setInterval(stopwatch.count, 1000);
    },
    stop: function() {

        clearInterval(intervalId);
    },

    count: function() {


        stopwatch.time--;

        $("#display").html(":" + stopwatch.time);


        if (stopwatch.time === 0) {

            lose++;

            $("#title").html("<img class='img-responsive' id='condensed' src='../TriviaGame/assets/images/CondensedMilkKids.jpg' alt='Image'/>");
            $("#questions").css("visibility", "hidden");
            $("#start").html("");

            stopwatch.time = 0;
            stopwatch.stop();

            var anotherTimer;

            anotherTimer = setTimeout(function() {
                triviaPlay.reset();
            }, 6000);

        }








    }
};

var triviaPlay = {




    newQuestion: function() {

        $("#questions").css("visibility", "visible");
        $(".score").css("visibility", "visible");
        $("body").css("background-image", "url('../TriviaGame/assets/images/victorianBackground.png')");
        $("#titleText").css("visibility", "hidden")






        var rando = Math.floor(Math.random() * (11 + 1));

        $("#bigQuestion").html(trivia[rando]);

        var answer = correctAnswer[rando];

        $("#a").off("click");
        $("#b").off("click");
        $("#c").off("click");
        $("#d").off("click");
        $(".stop").on("click", stopwatch.stop);

        if (answer.length <= 8) {

            $("#a").html("  " + correctAnswer[rando]);
            $("#b").html("  " + lameAnswer[rando]);
            $("#c").html("  " + closeAnswer[rando]);
            $("#d").html("  " + dumbAnswer[rando]);

            $("#a").on("click", triviaPlay.win);
            $("#b").on("click", triviaPlay.lose);
            $("#c").on("click", triviaPlay.lose);
            $("#d").on("click", triviaPlay.lose);
        }

        if (answer.length > 8 && answer.length <= 15) {

            $("#b").html("  " + correctAnswer[rando]);
            $("#c").html("  " + lameAnswer[rando]);
            $("#d").html("  " + closeAnswer[rando]);
            $("#a").html("  " + dumbAnswer[rando]);


            $("#b").on("click", triviaPlay.win);
            $("#c").on("click", triviaPlay.lose);
            $("#d").on("click", triviaPlay.lose);
            $("#a").on("click", triviaPlay.lose);
        }

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
        }






    },


    win: function() {

        win++;

        questionCounter++;

        console.log(questionCounter);

        $("#title").html("<img class='img-responsive' id='clara' src='../TriviaGame/assets/images/Clarabarton.jpg' alt='Image'/>");
        $("#questions").css("visibility", "hidden");

        if (questionCounter >= 8) {

            triviaPlay.ratings();
            var timeVar;

            timeVar = setTimeout(function() {
                triviaPlay.endgame();
            }, 10000);

        } else {
            var timeVar;

            timeVar = setTimeout(function() {
                triviaPlay.reset();
            }, 2000);


        }


       


    },

    lose: function() {

        lose++;

        questionCounter++;

        console.log(questionCounter);


        $("#title").html("<img class='img-responsive' id='mrsWard' src='../TriviaGame/assets/images/Mrs_Wardroper.jpg' alt='Image'/>");
        $("#questions").css("visibility", "hidden");



        if (questionCounter >= 8) {

            triviaPlay.ratings();

            var newVar;

            newVar = setTimeout(function() {
                triviaPlay.endgame();

            }, 10000);

        } else {

            var newVar;

            newVar = setTimeout(function() {
                triviaPlay.reset();

            }, 2000);



        }


       

    },

    reset: function() {

        $("#condensed").remove();
        $("#mrsWard").remove();
        $("#clara").remove();
        $("#questions").css("visibility", "visible");
        $("#questions").html(triviaPlay.newQuestion);

        stopwatch.time = 20;
        $("#display").html(":20");
        stopwatch.start();
        triviaPlay.newQuestion();

        var loseBox = $("<div>");

        loseBox.addClass("score");
        loseBox.append("Correct: " + win + "<br>Incorrect: " + lose);
        $("#title").append(loseBox);


    },

    ratings: function() {

        if (win <= 2) {

            $("#title").html("<img class='img-responsive' id='athlete' src='../TriviaGame/assets/images/Athlete.jpg' alt='Image'/>");
            $("#questions").css("visibility", "hidden");
            $("#start").css("visibility", "hidden");
            $("#display").css("visibility", "hidden");
            $(".score").css("color", "white");

            var ratingAlert = $("<div>");
            ratingAlert.addClass("userAlert");
            ratingAlert.text("You're more brawn than brains, it seems. Perhaps become an Athlete of some kind.");
            $("#title").append(ratingAlert);





            $("body").css("background-image", "none");




            stopwatch.time = 0;
            stopwatch.stop();

        }

        if (win > 2 && win <= 4) {

            $("#title").html("<img class='img-responsive' id='apprentice' src='../TriviaGame/assets/images/Apprentice.jpg' alt='Image'/>");
            $("#questions").css("visibility", "hidden");
            $("#start").css("visibility", "hidden");
            $("#display").css("visibility", "hidden");
            $(".score").css("margin-left", "0px");

            var ratingAlert = $("<div>");
            ratingAlert.addClass("userAlert");
            ratingAlert.text("You need some mentorship. Perhaps become an Apprentice.");
            $("#title").prepend(ratingAlert);


            $("body").css("background-image", "none");
            stopwatch.time = 0;
            stopwatch.stop();

        }

        if (win > 4 && win <= 6) {


            $("#title").html("<img class='img-responsive' id='highwayman' src='../TriviaGame/assets/images/Highwayman.jpg' alt='Image'/>");
            $("#questions").css("visibility", "hidden");
            $("#start").css("visibility", "hidden");
            $("#display").css("visibility", "hidden");
            $(".score").css("margin-left", "0px");

            var ratingAlert = $("<div>");
            ratingAlert.addClass("userAlert");
            ratingAlert.text("You're smart but light on knowledge. You're more cut out for the life of a Highwayman.");
            $("#title").prepend(ratingAlert);


            $("body").css("background-image", "none");
            stopwatch.time = 0;
            stopwatch.stop();

        }

        if (win > 6 && win < 8) {

            $("#title").html("<img class='img-responsive' id='apothecary' src='../TriviaGame/assets/images/Apothecary.jpg' alt='Image'/>");
            $("#questions").css("visibility", "hidden");
            $("#start").css("visibility", "hidden");
            $("#display").css("visibility", "hidden");
            $(".score").css("margin-left", "0px");

            var ratingAlert = $("<div>");
            ratingAlert.addClass("userAlert");
            ratingAlert.text("You're very wise indeed. You'd make a grand Apothecary.");
            $("#title").prepend(ratingAlert);

            $("body").css("background-image", "none");
            stopwatch.time = 0;
            stopwatch.stop();
        }

        if (win >= 8) {

            $("#title").html("<img class='img-responsive' id='aeronaut' src='../TriviaGame/assets/images/Aeronaut.jpg' alt='Image'/>");
            $("#questions").css("visibility", "hidden");
            $("#start").css("visibility", "hidden");
            $("#display").css("visibility", "hidden");
            $(".score").css("margin-left", "0px");

            var ratingAlert = $("<div>");
            ratingAlert.addClass("userAlert");
            ratingAlert.text("You've gotten a perfect score! You've got the brains of an Aeronaut.");
            $("#title").prepend(ratingAlert);


            $("body").css("background-image", "none");
            stopwatch.time = 0;
            stopwatch.stop();
        }


    },

    endgame: function() {

        questionCounter = 0;
        win = 0;
        lose = 0;
        $("#athlete").remove()
        $("#apothecary").remove()
        $("#apprentice").remove()
        $("#aeronaut").remove()
        $("#highwayman").remove()




        $("#start").css("visibility", "visible");
        $("#display").css("visibility", "visible");
        $("#questions").html(triviaPlay.newQuestion);
        $("#questions").css("visibility", "hidden");









        $(".userAlert").remove();

        stopwatch.stop();
        stopwatch.time = 20;
        $("#display").html(":20");
        $("#start").html("Play Again?")


    }

};
