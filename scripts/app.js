console.log("Sanity ✅");


// This is my attempt to see if I understand correctly how to push to a different branch, fingers crossed

// ***** Important Note *****
    // hunger === resilience
    // sleep === genetics
    // bored === instinct


// === Jquery Variables ===
const $resilience = $("#resilience");
const $genetics = $("#genetics");
const $instinct = $("#instinct");
const $characterSprite = $("#character-sprite");


// Commented out for streamlined testing
$("#name-modal").show();

$("#save-name").on("click", function(event) {
    $("#name-modal").hide();
    getName();
    starter();
});

$("#play-again").on("click", function(event) {
    window.location.reload(false); 
});

$("#admit-defeat").on("click", function(event) {
    $("#loss-modal").hide();
    $("body").css("filter", "blur(50px)").css("transition", "filter 100s");
});

const getName = function getName() {
    game.name = $("#char-name").val();
    $("#character").text(`Character: ${game.name}`);
}



let interval = null;
let endgame = false;
const starter = function starter() {
    interval = setInterval(function(){
    game.time++;
    game.progress += 5;
    
    // button code
    game.resilience++;
    game.genetics++;
    game.instinct++;

    $resilience.text(`Resilience ${game.resilience}`);
    $genetics.text(`Genetics ${game.genetics}`);
    $instinct.text(`Instinct ${game.instinct}`);

    game.buttonColorChange();
    game.progressCheck();
    game.rangeCheck();

    // Stage display value
    $("#stage").text(`Evolution: ${game.stage}`);

    // Progress bar
    $("#dynamic").attr("aria-valuenow", game.progress).css("width", game.progress  + "%");

    // Total progress bar
    $("#total-progress").attr("aria-valuenow", game.time).css("width", game.time  + "%");

    // Endgame
    if (game.time >= 100 && endgame === false) {
        endgame = true;
        game.stage = 6;

        $("#main-container").addClass("x");
        $( "#main-container" ).wrap( "<div id='main-subcontainer' class='y' style='height: 80vh'></div>");
        
        // Bunch of little changes for endgame
        $("#reset").css("display", "none");
        // Maybe change fonts?
        $("#title").text("SURVIVE");
        $("#stage").text(`Evolution: ?????`);
        $("#character").text(`Character: ?????`);
        $(".btn").addClass("btn-lg");
        $characterSprite.attr("src", "");
    }
    }, 1000);
} // === END INTERVAL / TIMER FUNCTION ===





const game = {
    time: 0,
    evolutions: 0,
    progress: 0,
    stage: 1,
    name: '',
    clicks: {
        resilience: 0,
        genetics: 0,
        instinct: 0,
    },
    resilience: 0,
    genetics: 0,
    instinct: 0,

    // ===== Game Methods =====

    // Moved the timer code out of the game object to allow for a global variable and because having it in the game object seemed not particularly necessary
    startTimer() {

    },

    // Method to change button color based on value
    buttonColorChange() {

        // resilience Button
        if (game.resilience < 3) {
            $resilience.css("background-color", "#90be6d").css("color", "black");
        } else if (game.resilience >= 3 && game.resilience <= 6) {
            $resilience.css("background-color", "#f8961e").css("color", "black");
        } else if (game.resilience > 6) {
            $resilience.css("background-color", "#f94144").css("color", "white");
        }

        // genetics Button
        if (game.genetics < 3) {
            $genetics.css("background-color", "#90be6d").css("color", "black");
        } else if (game.genetics >= 3 && game.genetics <= 6) {
            $genetics.css("background-color", "#f8961e").css("color", "black");
        } else if (game.genetics > 6) {
            $genetics.css("background-color", "#f94144").css("color", "white");
        }

        // instinct Button
        if (game.instinct < 3) {
            $instinct.css("background-color", "#90be6d").css("color", "black");
        } else if (game.instinct >= 3 && game.instinct <= 6) {
            $instinct.css("background-color", "#f8961e").css("color", "black");
        } else if (game.instinct > 6) {
            $instinct.css("background-color", "#f94144").css("color", "white");
        }
    },

    // Maybe a one stop function for keeping values from between 0-10
    rangeCheck() {
        // Checks if above 0 and below 11
        // Resilience
        if (game.resilience < 0) {
            game.resilience = 0;
        };
        // Genetics
        if (game.genetics < 0) {
            game.genetics = 0;
        };
        // Instinct
        if (game.instinct < 0) {
            game.instinct = 0;
        };

        if (game.resilience >= 11 || game.genetics >= 11 || game.instinct >= 11) {
            if (game.stage !== 6) {
                $characterSprite.attr("src", "assets/skull.png");
                $("#loss-modal").show();
                clearInterval(interval);

            } else if (game.stage === 6 && game.time >= 120) {
                $("#main-container").removeClass("x");
                $("#main-subcontainer").removeClass("y");
    
                $("#loss-title").text("Triumph!");
                $("#loss-text").text("You have transcended the Circle of Life, well done.");
                $("#admit-defeat").text("Revel");
                $("#loss-modal").show();
                clearInterval(interval);

            } else if (game.stage === 6 && game.time < 120) {
                $("#main-container").removeClass("x");
                $("#main-subcontainer").removeClass("y");
    
                $("#loss-title").text("Game Over");
                $("#loss-text").text("Bitter defeat at the hands of the Singularity...");
                $("#admit-defeat").text("Self Loathe");
                $("#play-again").text("Seek Redemption");
                $("#loss-modal").show();
                clearInterval(interval);
            }
        }
    },

    // Checks for game progression and changes evolution and sprite accordingly and checks for secret ending states
    progressCheck() {

        // Jellyfish ending
        if (game.progress === 100 && game.stage === 2 && game.clicks.resilience / game.clicks.genetics >= 1.8 && game.clicks.resilience / game.clicks.instinct >= 1.8) {
            $characterSprite.attr("src", "assets/jelly.gif");
            $("#loss-text").text("You are a jellyfish... this is your final form");
            $("#admit-defeat").text("Remain Gelatinous");
            $("#loss-modal").show();
            // Fix this
            clearInterval(interval);
            return;
        };

        // Gator ending
        if (game.progress === 100 && game.stage === 3 && game.clicks.instinct / game.clicks.genetics >= 1.5 && game.clicks.instinct / game.clicks.resilience >= 1.5) {
            $characterSprite.attr("src", "assets/gator.png");
            $("#loss-text").text("You are an alligaor... this is your final form");
            $("#admit-defeat").text("Embrace Gaterdome");
            $("#loss-modal").show();
            // Fix this
            clearInterval(interval);
            return;
        };

        // Cincinnati Zoo ending
        if (game.progress === 100 && game.stage === 4 && game.clicks.genetics / game.clicks.instinct >= 1.3 && game.clicks.genetics / game.clicks.resilience >= 1.3) {
            $characterSprite.attr("src", "assets/gorilla.png");
            $("#loss-text").text("You are a gorilla... this is your final form... for now");
            $("#admit-defeat").text("Mourn Harambe");
            $("#loss-modal").show();
            // Fix this
            clearInterval(interval);
            return;
        };


        // === SECOND HALF OF progressCheck() ===

        // Actual progression logic
        if (game.progress === 100 && game.stage === 1) {
            game.progress = 0;
            $characterSprite.attr("src", "assets/amoeba.png");
            console.log($characterSprite.attr("src"))
            game.stage++;
        } else if (game.progress === 100 && game.stage === 2) {
            game.progress = 0;
            $characterSprite.attr("src", "assets/fish.png");
            console.log($characterSprite.attr("src"));
            game.stage++;
        } else if (game.progress === 100 && game.stage === 3) {
            game.progress = 0;
            $characterSprite.attr("src", "assets/primate.png");
            console.log($characterSprite.attr("src"));
            game.stage++;
        } else if (game.progress === 100 && game.stage === 4) {
            game.progress = 0;
            $characterSprite.attr("src", "assets/caveman.gif");
            console.log($characterSprite.attr("src"));
            game.stage++;
        };
    },
}; // ===== END OF GAME OBJECT =====












// Button onClick value reducer fucntions
$resilience.on("click", function(event) {
    game.resilience--;
    game.buttonColorChange();
    game.clicks.resilience++;
    game.rangeCheck();
    $resilience.text(`Resilience ${game.resilience}`);
});
$genetics.on("click", function(event) {
    game.genetics--;
    game.buttonColorChange();
    game.clicks.genetics++;
    game.rangeCheck();
    $genetics.text(`Genetics ${game.genetics}`);
});
$instinct.on("click", function(event) {
    game.instinct--;
    game.buttonColorChange();
    game.clicks.instinct++;
    game.rangeCheck();
    $instinct.text(`Instinct ${game.instinct}`);
});

// This is my favorite code in this
$("#reset").on("click", function(event) {
    window.location.reload(false); 
});

