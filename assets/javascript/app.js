

  
    
    var queryURL = "http://jservice.io/api/clues";
    var trivia = []
     var correctAnswer = []

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
  $("#start").on("click", triviaPlay.newQuestion);

};

var intervalId;

var stopwatch = {

  time: 30,

  reset: function() {

    stopwatch.time = 30;
    $("#display").html(":30");

  },

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

    var abcd = ["A","B","C","D"]

   var rando = Math.floor(Math.random() * (trivia.length+1));

   $("#bigQuestion").html(trivia[rando]);

   var anyLetter = Math.floor(Math.random() * (abcd.length+1));
   $("#a").html("  " + correctAnswer[rando]);
   


   },

  answers: function() {

   




  },


  win: function(){



  },


lose: function(){



},

reset: function() {


}



}; 
    // var converted = stopwatch.timeConverter(stopwatch.time);
 // console.log(converted);

    

  // },
  // timeConverter: function(t) {

  //   var minutes = Math.floor(t / 60);
  //   var seconds = t - (minutes * 60);

  //   if (seconds < 10) {
  //     seconds = "0" + seconds;
 

   
  
