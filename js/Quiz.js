class Quiz {
  constructor() { }

  getState() {
    var gameStateRef = database.ref('gameState');
    gameStateRef.on("value", function (data) {
      gameState = data.val();
    })

  }

  update(state) {
    database.ref('/').update({
      gameState: state
    });
  }

  async start() {
    if (gameState === 0) {
      contestant = new Contestant();
      var contestantCountRef = await database.ref('contestantCount').once("value");
      if (contestantCountRef.exists()) {
        contestantCount = contestantCountRef.val();
        contestant.getCount();
      }
      question = new Question();
      question.display();
    }
  }

  play() {
    //write code here to hide question elements
    question.hide();
    //write code to change the background color here
    background("yellow");

    //write code to show a heading for showing the result of Quiz
    textSize(20);
    text("Quiz Results", 425, 100);
    //call getContestantInfo( ) here
    Contestant.getPlayerInfo();

    //write condition to check if contestantInfor is not undefined
    if(allContestants !== undefined) {
      fill("crimson");
      textSize(20);
      text("Contestant names who answered correctly are highlighted in green!", 130, 230);
      for(var con in allContestants) {
        var correctAnswer = "2";
        if(correctAnswer === allContestants[con].answer) {
          fill("green");
          text(allContestants[con].name, 300, 350);
        } else {
          fill("red");
          text(allContestants[con].name, 300, 350);
        }
      }
    }
  }
}
