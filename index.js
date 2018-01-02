const green = "green";
const red = "red";
const yellow = "yellow";
const blue = "blue";


$(document).ready(function() {

      // ----- Mechanics of Simon -----
  
  var simon = {
    colors: [green, red, yellow, blue],
    simonSeq: [],
    userSeq: [],
    level: 0,
    sendColor: function(color) {
      this.userSeq.push(color);
    },
    nextSequence: function() {
      var nextColor = this.colors[
        Math.floor(Math.random() * this.colors.length)
      ];
      this.simonSeq.push(nextColor);
      this.level++;
    },
    startSimon: function() {
      if ($(".start-btn").hasClass("active")) {
        simon.simonSeq = [];
        simon.userSeq = [];
        simon.level = 0;
        simon.nextSequence();
        simon.simonPlay();
      } else {
        alert("Simon says: TURN ON the game!!!");
      }
    },
    simonPlay: function() {
      $("#number").text(simon.level);
      $(".simonButton").removeClass("active");
      simon.userSeq = [];
      var step = 0;
      var simonInterval = setInterval(function() {
        var colorSound = $("#" + simon.simonSeq[step] + "Sound");
        var colorID = $("#" + simon.simonSeq[step]);
        colorSound[0].play();
        colorID.addClass("jqactive");
        setTimeout(function() {
          colorID.removeClass("jqactive");
        }, 500);
        step++;
        if (step === simon.simonSeq.length) {
          clearInterval(simonInterval);
          setTimeout(function() {
            $(".simonButton").addClass("active");
          }, 500);
        }
      }, 1000);
    },
    checkSeq: function(thisColor) {
      var i = simon.userSeq.lastIndexOf(thisColor);
      if (simon.userSeq[i] !== simon.simonSeq[i]) {
        simon.wrongStep();
        if ($(".strict-status").hasClass("active")) {
          setTimeout(simon.startSimon, 4000);
        } else {
          setTimeout(simon.simonPlay, 4000);
        }
      }
      if (
        simon.userSeq.length === simon.simonSeq.length &&
        simon.userSeq[i] === simon.simonSeq[i]
      ) {
        if (simon.level === 20) {
          simon.winner();
        } else {
          simon.nextSequence();
          setTimeout(simon.simonPlay, 1000);
        }
      }
    },
    wrongStep: function() {
      $(".simonButton").removeClass("active");
      var i = 0;
      var wrongInterval = setInterval(function() {
        $("#number").text("!!!");
        setTimeout(function() {
          $("#number").text("");
        }, 500);
        i++;
        if (i === 3) {
          clearInterval(wrongInterval);
        }
      }, 1000);
    },
    winner: function() {
      $(".simonButton").removeClass("active");
      var i = 0;
      var theWinner = setInterval(function() {
        $("#number").html(function() {
          return "<i class='fa fa-trophy' aria-hidden='true'></i>";
        });
        setTimeout(function() {
          $("#number").text("");
        }, 500);
        i++;
        if (i === 5) {
          clearInterval(theWinner)
          setTimeout(simon.startSimon, 3000);
        }
      }, 1000);
    }
  };

//   ----- User actions -----
  
  $(".outerSwitch").click(function() {
    simon.simonSeq = [];
    simon.userSeq = [];
    simon.level = 0;
    $(".innerSwitch").toggleClass("switchOn");
    $("#number")
      .toggleClass("redNum")
      .text("00");
    $(".start-btn, .strict-btn, .simonButton").toggleClass("active");
    $(".strict-status").removeClass("active");
  });

  $(".start-btn").click(function() {
    simon.startSimon();
  });

  $(".strict-btn").click(function() {
    if ($(this).hasClass("active")) {
      $(".strict-status").toggleClass("active");
    }
  });

  $("#green").click(function() {
    if ($(".simonButton").hasClass("active")) {
      $("#greenSound")[0].play();
      simon.sendColor(green);
      simon.checkSeq(green);
    }
  });

  $("#red").click(function() {
    if ($(".simonButton").hasClass("active")) {
      $("#redSound")[0].play();
      simon.sendColor(red);
      simon.checkSeq(red);
    }
  });

  $("#yellow").click(function() {
    if ($(".simonButton").hasClass("active")) {
      $("#yellowSound")[0].play();
      simon.sendColor(yellow);
      simon.checkSeq(yellow);
    }
  });

  $("#blue").click(function() {
    if ($(".simonButton").hasClass("active")) {
      $("#blueSound")[0].play();
      simon.sendColor(blue);
      simon.checkSeq(blue);
    }
  });
});
