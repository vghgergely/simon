$(document).ready(function () {
    var currRound = "";
    var playerRound = "";
    var strict = false;
    var steps = 0;

    function play(currRound) {
        for (i = 0; i < currRound.length; i++) {
            switch(currRound[i]) {
                case "1":
                    //TRIGGER 1
                    break;
                case "2":
                    //TRIGGER 2
                    break;
                case "3":
                    //TRIGGER 3
                    break;
                case "4":
                    //TRIGGER 4
                    break;
            }
        }
    }

    function startRound(event) {
        currRound += Math.floor(Math.random() * 4 + 1).toString();
        play(currRound);
        steps = currRound.length;
        $("#steps").text(steps);
        $("#display").text(currRound);
        
    }

    function buttonPress(event) {
        playerRound += event.data.button.toString();
        $("#prevRound").text(playerRound);

        if (currRound == playerRound) {
            if (steps == 20) {
                alert("you won!");
            }
            else{
                alert("good job!");
                $("#start").trigger("click", { currRound: currRound });
                playerRound = "";
                $("#prevRound").text(playerRound);
            }
        }

        if (currRound.substr(0, playerRound.length) !== playerRound) {
            if (strict) {
                alert("wrong sequence");
                $("#restart").trigger("click");
            } else {
                alert("wrong sequence");
                playerRound = "";
                $("#prevRound").text(playerRound);
                play(currRound);
            }
            
        }
        
    }

    $("#start").click({ currRound: currRound }, startRound);

    $("#restart").click(function() {
        currRound = "";
        playerRound = "";
        steps = 0;
        $("#display").text(currRound);
        $("#prevRound").text(playerRound);
        $("#steps").text(steps);
    });

    $("#strict").change(function() {
        strict = !strict;
    });

    $("#btn1").click({ button: 1 },buttonPress);
    $("#btn2").click({ button: 2 }, buttonPress);
    $("#btn3").click({ button: 3 }, buttonPress);
    $("#btn4").click({ button: 4 }, buttonPress);
})