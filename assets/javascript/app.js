//set global variables

// var queryURL = "http://jservice.io/api/clues";
//sadly i must populate these arrays..I wanted to populate them by looping them through a query response but oh well:

var trivia = ["The 1st Tuesday after the 1st Monday in November", "The Atlanta Braves are in this division of the National League", "Eliza Doolittle did it for a living", "Subtitled 'The Search for Spock'", "Australia has 1 of 2 animals on its coat of arms", "Malcolm McDowell & Nastassja Kinski's 'purr'fect roles in 1982", "Traditionally speaking, as this state goes, 'so goes the nation'", "Eddie Gaedel, number 1/8th, was the only one ever to play in the Major Leagues", "In the Old West they were in charge of horses, on a movie set in charge of chickens", "Title describing Tom Cruise's precarious commercial enterprise", "Title of this song, which actually means 'to tramp the roads with a backpack'", "Ancient weapon kept a stone's throw from its target", "'Shrill' name for train tour electioneering", "Now a paper company sales rep, he pitched only perfect game in World Series history", "He solemnly swears you in, in court", "Film where Lily Tomlin is really Steve Martin's better half", "'Satanic' mammal found only on island S. of Australia", "It gets things going in a chemical reaction", "The rooster was symbol of this party before Thomas Nast drew their new one in 1870", "Boston's 'Green Monster' is in this stadium", "Ub Iwerks, Friz Freleng & Tex Avery drew the line at this job", "Mozart's middle name becomes a movie", "Elizabeth Taylor character that could have burnt her paws on a hot tin roof", "He called himself 'the plain people's president against the privileged people's Congress", "In 1984, he became 1st manager to win over 100 games with teams in both Major Leagues"]
var correctAnswer = ["Election Day", "The Western Division", "Sold Flowers", "Star Trek III", "kangaroo and emu", "cat people", "Maine", "a midget", "wranglers", "Risky Business", "Waltzing Matilda", "a catapult", "a whistle stop", "Don Larsen", "a bailiff", "All of Me", "Tasmanian Devil", "a catalyst", "the Democrats", "Fenway Park", "cartoonists or animators", "Amadeus", "Maggie the Cat", "Harry S Truman", "Sparky Anderson"]
var closeAnswer = ["Arbor Day", "The Eastern Conference", "Prostitute", "The Biography of Leonard Nimoy", "peacock and crocodile", "The Painted Bird", "Iowa", "Woman", "Coopers", "Mission Impossible", "Oh Suzanna", "cat-o-nine-tails", "stump speech", "Michael Scott", "judge", "The Man With Two Brains", "Banshee", "an enzyme", "The Torys", "Agganis Arena", "publishers", "Franz", "Virginia Woolf", "Donald Trump", "Joe Torre"];
var lameAnswer = ["November Solstice", "The Eastern Division", "Skullery Maid", "Picard's Rescue", "willoughby and koala", "Tess", "New Hampshire", "Lefty", "Keepers", "Tropic Thunder", "Clementine", "mace", "soap box", "Greg Maddux", "prosecutor", "Dirty Rotten Scoundrels", "Wombat", "an electron", "Tammany Hall", "TD Garden", "fishermen", "Wolfgang", "Martha", "Herbert Hoover", "Tony LaRussa"];
var dumbAnswer = ["Taco Tuesday", "The Peach Bowl", "Chorus Girl", "The Final Frontier", "jackalope and jaberwock", "A Clockword Orange", "Ohio", "Arab", "Peepers", "The Scientology Center", "I'll Go A' Ramblin", "tourret", "road trip", "Sandy Koufax", "public defender", "Dead Men Don't Wear Plaid", "Kimodo Dragon", "a chain reaction", "The Green Party", "Three Rivers Stadium", "architects", "Saglieri", "Cleopatra", "Woodrow Wilson", "Earl Weaver"];
var win = 0;
var lose = 0;
var questionCounter = 0;
var rando;
var answerLength;
var intervalId;

//=======================================================================
//Sadly, none of this worked as I can't mix http and https to deploy on GitHub. So I copy pasted arrays-the unsophisticated fix
//call the query and push the data into arrays

// $.ajax({
//     url: queryURL,
//     method: "GET"

// }).done(function(response) {

    // for (i = 0; i < 25; i++) {

    //     trivia.push(response[i].question);

    // };



    // for (k = 0; k < 25; k++) {

    //     correctAnswer.push(response[k].answer);
    // };



//create event handlers that run timing functions depending on what's clicked. All answer buttons have the class .stop, which stops timer


window.onload = function() {

    $(".stop").on("click", stopwatch.stop);

    $("#start").on("click", stopwatch.start);

    $("#start").on("click", triviaPlay.newQuestion);

    // newQuestion();

};

//this runs the stopwatch/timer. No matter what answer is clicked, it stops the timer

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

//this runs the game play-generates new questions,

var triviaPlay = {



    newQuestion: function() {



        $("#questions").css("visibility", "visible");
        $(".score").css("visibility", "visible");
        $("body").css("background-image", "url('../TriviaGame/assets/images/victorianBackground.png')");
        $("#titleText").css("visibility", "hidden");

        rando = Math.floor(Math.random() * (trivia.length + 1));

        $("#bigQuestion").html(trivia[rando]);



        $("#a").off("click");
        $("#b").off("click");
        $("#c").off("click");
        $("#d").off("click");
        $(".stop").on("click", stopwatch.stop);

        //this is to make sure whatever is at the index of the array gets decremented (unless zero), because repeats are spliced out & array shortens
        //however, I still have the issue of one question repeating
        
        if (rando > 0) {

            answerLength = correctAnswer[rando - 1].length;

        } else {

            answerLength = correctAnswer[rando].length

        }


        //these conditionals are just an arbitrary way to decide how to shuffle the answers onto the buttons so it's different each time


        if (answerLength <= 7) {

            $("#a").html(correctAnswer[rando]);
            $("#b").html(lameAnswer[rando]);
            $("#c").html(closeAnswer[rando]);
            $("#d").html(dumbAnswer[rando]);

            $("#a").on("click", triviaPlay.win);
            $("#b").on("click", triviaPlay.lose);
            $("#c").on("click", triviaPlay.lose);
            $("#d").on("click", triviaPlay.lose);
        }

        if (answerLength > 7 && answerLength <= 12) {

            $("#b").html(correctAnswer[rando]);
            $("#c").html(lameAnswer[rando]);
            $("#d").html(closeAnswer[rando]);
            $("#a").html(dumbAnswer[rando]);


            $("#b").on("click", triviaPlay.win);
            $("#c").on("click", triviaPlay.lose);
            $("#d").on("click", triviaPlay.lose);
            $("#a").on("click", triviaPlay.lose);
        }

        if (answerLength > 12 && answerLength <= 16) {

            $("#d").html(correctAnswer[rando]);
            $("#a").html(lameAnswer[rando]);
            $("#b").html(closeAnswer[rando]);
            $("#c").html(dumbAnswer[rando]);


            $("#d").on("click", triviaPlay.win);
            $("#a").on("click", triviaPlay.lose);
            $("#b").on("click", triviaPlay.lose);
            $("#c").on("click", triviaPlay.lose);


        }

        if (answerLength > 16) {
            $("#c").html(correctAnswer[rando]);
            $("#d").html(lameAnswer[rando]);
            $("#a").html(closeAnswer[rando]);
            $("#b").html(dumbAnswer[rando]);

            $("#c").on("click", triviaPlay.win);
            $("#d").on("click", triviaPlay.lose);
            $("#a").on("click", triviaPlay.lose);
            $("#b").on("click", triviaPlay.lose);
        }

        //Fix some questions that were catalogued awkwardly or mistyped in the API...


        if (trivia[rando] === "1 of 2 animals on its coat of arms") {

            $("#bigQuestion").prepend("Australia has ");
            $("#c").html("kangaroo and emu");
            answerLength = 16;



        }

        if (trivia[rando] === "Eliza Doolittle did it for a living") {


            $("#c").html("sold flowers");

            answerLength = 12;



        }


    },


    used: function() {
        //splice used questions and answers (of every kind) out of their arrays, so they're not repeated

        var index = trivia.indexOf(trivia[rando]);
        var correctIndex = correctAnswer.indexOf(correctAnswer[rando]);
        var closeIndex = closeAnswer.indexOf(closeAnswer[rando]);
        var lameIndex = lameAnswer.indexOf(lameAnswer[rando]);
        var dumbIndex = dumbAnswer.indexOf(dumbAnswer[rando]);

        if (index > -1) {
            var usedQuestions = trivia.splice(index, 1);
            console.log(usedQuestions);
        }

        if (correctIndex > -1) {
            var usedCorrect = correctAnswer.splice(correctIndex, 1);
            console.log(usedCorrect);
        }

        if (closeIndex > -1) {
            var usedClose = closeAnswer.splice(closeIndex, 1);
            console.log(usedClose);
        }

        if (lameIndex > -1) {
            var usedLame = lameAnswer.splice(lameIndex, 1);
            console.log(usedLame);
        }

        if (dumbIndex > -1) {
            var usedDumb = dumbAnswer.splice(dumbIndex, 1);
            console.log(usedDumb);

        }



    },

    // win function is still part of the triviaPlay object


    win: function() {

        win++;

        questionCounter++;

        console.log(questionCounter);

        $("#title").html("<img class='img-responsive' id='clara' src='../TriviaGame/assets/images/Clarabarton.jpg' alt='Image'/>");
        $("#questions").css("visibility", "hidden");

        if (questionCounter > 24) {

            triviaPlay.ratings();
            var timeVar;

            timeVar = setTimeout(function() {
                triviaPlay.endgame();
            }, 12000);

        } else {
            var timeVar;

            timeVar = setTimeout(function() {
                triviaPlay.reset();
            }, 2000);


        }

    },

    // lose function is still part of the triviaPlay object

    lose: function() {

        lose++;

        questionCounter++;

        console.log(questionCounter);


        $("#title").html("<img class='img-responsive' id='mrsWard' src='../TriviaGame/assets/images/Mrs_Wardroper.jpg' alt='Image'/>");
        $("#questions").css("visibility", "hidden");


        if (questionCounter > 24) {

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


    // reset function is still part of the triviaPlay object

    reset: function() {

        triviaPlay.used();

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


    // ratings function is still part of the triviaPlay object--it rates the User score within a range of correct questions

    ratings: function() {

        if (win <= 8) {

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



        if (win > 8 && win <= 14) {

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

        if (win > 14 && win <= 18) {


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

        if (win > 18 && win <= 24) {

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

        if (win = 25) {

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


    //endgame is still part of the triviaPlay object

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

        window.location.reload();




    }

};
