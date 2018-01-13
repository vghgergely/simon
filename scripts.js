$(document).ready(function () {
    var currRound = "";
    var playerRound = "";
    var strict = false;
    var steps = 0;

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async function play(currRound) {
        for (i = 0; i < currRound.length; i++) {
            var temp = $("#btn" + currRound[i]);
            temp.addClass("active");
            $("#audio" + currRound[i]).get(0).play();
            await sleep(600);
            temp.removeClass("active");


        }
    }

    function startRound() {
        currRound += Math.floor(Math.random() * 4 + 1).toString();
        play(currRound);
        steps = currRound.length;
        $("#steps").text(steps);
        $("#display").text(currRound);
        
    }

    function buttonPress(event) {
        $("#audio" + event.data.button.toString()).get(0).play();
        playerRound += event.data.button.toString();
        $("#prevRound").text(playerRound);
       
        setTimeout(function() {
                if (currRound == playerRound) {
                    if (steps == 20) {
                        alert("you won!");
                    } else {
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
            },
            1);


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

    $("#strict").click(function() {
        strict = !strict;
        $(this).toggleClass("strict");
        $("#strictText").toggleClass("bold");
    });

    $("#btn1").click({ button: 1 },buttonPress);
    $("#btn2").click({ button: 2 }, buttonPress);
    $("#btn3").click({ button: 3 }, buttonPress);
    $("#btn4").click({ button: 4 }, buttonPress);
})