

  
    
    var queryURL = "http://jservice.io/api/clues";
    var trivia = []
    var correctAnswer = []
    var closeAnswer =["Arbor Day","The Eastern Conference","Prostitute","The Biography of Leonard Nimoy","peacock and crocodile","The Painted Bird"];
    var lameAnswer = ["November Solstice","The Eastern Division","Skullery Maid","Picard's Rescue","willoughby and koala","Tess"];
    var dumbAnswer = ["Taco Tuesday","The Peach Bowl","Chorus Girl","The Final Frontier","jackalope and jaberwock","A Clockword Orange"];
    var win = 0;
    var lose = 0;

    $.ajax({
      url: queryURL,
      method: "GET"
    }).done(function(response) {

            for (i=0 ; i<= response.length-1;i++ ){
           
            trivia.push(response[i].question);
        }

            for (k=0 ; k<= response.length-1;k++ ){ 
           
            correctAnswer.push(response[k].answer);
        }

           

    });






window.onload = function() {
  $("#lap").on("click", stopwatch.recordLap);
  $(".stop").on("click", stopwatch.stop);
  $("#reset").on("click", stopwatch.reset);
  $("#start").on("click", stopwatch.start);
  $("#start").on("click", triviaPlay.newQuestion);
  
  $("#a").on("click", triviaPlay.win);
  $("#b").on("click", triviaPlay.lose);
  $("#c").on("click", triviaPlay.lose);
  $("#d").on("click", triviaPlay.lose);
 


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

   // var abcd = ["a","b","c","d"]
   // var anyLetter = Math.floor(Math.random() * (abcd.length+1));

   var rando = Math.floor(Math.random() * (trivia.length+1));

   $("#bigQuestion").html(trivia[rando]);

   
   $("#a").html("  " + correctAnswer[rando]);
   $("#b").html("  " + lameAnswer[rando]);
   $("#c").html("  " + closeAnswer[rando]);
   $("#d").html("  " + dumbAnswer[rando]);

   
   },

  answers: function() {
    // put the answers into the buttons but put the buttons in a random spot (childOf) in the Unordered list

  },

  win: function(){

  win++;
  $("#title").html("<img class='img-responsive' id='clara' src='../TriviaGame/assets/images/Clarabarton.jpg' alt='Image'/>");
  $("#questions").css("visibility", "hidden");
   setTimeout(function(){
                       triviaPlay.reset();
                }, 2000);

  },

lose: function(){

  lose++;
  $("#title").html("<img class='img-responsive' id='mrsWard' src='../TriviaGame/assets/images/Mrs_Wardroper.jpg' alt='Image'/>");
  $("#questions").css("visibility", "hidden");
    setTimeout(function(){
                      triviaPlay.reset();
                }, 2000);

},

reset: function() {
  $("#mrsWard").remove()
  $("#clara").remove()
  $("#questions").css("visibility", "visible");
  $("#questions").html(triviaPlay.newQuestion);
  
    stopwatch.time = 30;
    $("#display").html(":30");
    stopwatch.start()

}


}; 

 

   
  
