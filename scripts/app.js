console.log("Sanity ✅");

// ***** Important Note *****
    // hunger === resilience
    // sleep === genetics
    // bored === instinct


// === Jquery Variables ===
const $resilience = $("#hunger");
const $genetics = $("#sleep");
const $instinct = $("#bored");
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
const starter = function starter() {
    interval = setInterval(function(){
    game.time++;
    game.progress += 5;
    
    // button code
    game.hunger++;
    game.sleep++;
    game.bored++;

    $resilience.text(`Resilience ${game.hunger}`);
    $genetics.text(`Genetics ${game.sleep}`);
    $instinct.text(`Instinct ${game.bored}`);

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
    if (game.time >= 100) {
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
        clearInterval(interval);
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
        hunger: 0,
        sleep: 0,
        bored: 0,
    },
    hunger: 0,
    sleep: 0,
    bored: 0,

    // ===== Game Methods =====

    // Moved the timer code out of the game object to allow for a global variable and because having it in the game object seemed not particularly necessary
    startTimer() {

    },

    // Method to change button color based on value
    buttonColorChange() {

        // Hunger Button
        if (game.hunger < 3) {
            $resilience.css("background-color", "#90be6d").css("color", "black");
        } else if (game.hunger >= 3 && game.hunger <= 6) {
            $resilience.css("background-color", "#f8961e").css("color", "black");
        } else if (game.hunger > 6) {
            $resilience.css("background-color", "#f94144").css("color", "white");
        };

        // Sleep Button
        if (game.sleep < 3) {
            $genetics.css("background-color", "#90be6d").css("color", "black");
        } else if (game.sleep >= 3 && game.sleep <= 6) {
            $genetics.css("background-color", "#f8961e").css("color", "black");
        } else if (game.sleep > 6) {
            $genetics.css("background-color", "#f94144").css("color", "white");
        };

        // Bored Button
        if (game.bored < 3) {
            $instinct.css("background-color", "#90be6d").css("color", "black");
        } else if (game.bored >= 3 && game.bored <= 6) {
            $instinct.css("background-color", "#f8961e").css("color", "black");
        } else if (game.bored > 6) {
            $instinct.css("background-color", "#f94144").css("color", "white");
        };
    },

    // Maybe a one stop function for keeping values from between 0-10
    rangeCheck() {
        // Checks if above 0 and below 11
        // Resilience
        if (game.hunger < 0) {
            game.hunger = 0;
        };
        // Genetics
        if (game.sleep < 0) {
            game.sleep = 0;
        };
        // Instinct
        if (game.bored < 0) {
            game.bored = 0;
        };
        if (game.hunger >= 11 || game.sleep >= 11 ||game.bored >= 11 && game.stage !== 6) {
            $characterSprite.attr("src", "assets/skull.png");
            $("#loss-modal").show();
            clearInterval(interval);
        } else if (game.hunger >= 11 || game.sleep >= 11 ||game.bored >= 11 && game.stage === 6 && game.time >= 120) {
            $("#loss-title").text("Triumph!");
            $("#loss-text").text("You have transcended the Circle of Life, well done.");
            $("#admit-defeat").text("Revel");
            $("#loss-modal").show();
        } else if (game.hunger >= 11 || game.sleep >= 11 ||game.bored >= 11 && game.stage === 6 && game.time < 120) {
            $("#loss-title").text("Game Over");
            $("#loss-text").text("Bitter defeat at the hands of the Singularity...");
            $("#admit-defeat").text("Self Loathe");
            $("#play-again").text("Seek Redemption");
            $("body").css("filter", "blur(50px)").css("transition", "filter 45s");
            $("#loss-modal").show();
        }
    },

    // Checks for game progression and changes evolution and sprite accordingly and checks for secret ending states
    progressCheck() {

        // Jellyfish ending
        if (game.progress === 100 && game.stage === 2 && game.clicks.hunger / game.clicks.sleep >= 1.8 && game.clicks.hunger / game.clicks.bored >= 1.8) {
            $characterSprite.attr("src", "assets/jelly.gif");
            $("#loss-text").text("You are a jellyfish... this is your final form");
            $("#admit-defeat").text("Remain Gelatinous");
            $("#loss-modal").show();
            // Fix this
            clearInterval(interval);
            return;
        };

        // Gator ending
        if (game.progress === 100 && game.stage === 3 && game.clicks.bored / game.clicks.sleep >= 1.5 && game.clicks.bored / game.clicks.hunger >= 1.5) {
            $characterSprite.attr("src", "assets/gator.png");
            $("#loss-text").text("You are an alligaor... this is your final form");
            $("#admit-defeat").text("Embrace Gaterdome");
            $("#loss-modal").show();
            // Fix this
            clearInterval(interval);
            return;
        };

        // Cincinnati Zoo ending
        if (game.progress === 100 && game.stage === 4 && game.clicks.sleep / game.clicks.bored >= 1.3 && game.clicks.sleep / game.clicks.hunger >= 1.3) {
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
    game.hunger--;
    game.buttonColorChange();
    game.clicks.hunger++;
    $resilience.text(`Resilience ${game.hunger}`);
});
$genetics.on("click", function(event) {
    game.sleep--;
    game.buttonColorChange();
    game.clicks.sleep++;
    $genetics.text(`Genetics ${game.sleep}`);
});
$instinct.on("click", function(event) {
    game.bored--;
    game.buttonColorChange();
    game.clicks.bored++;
    $instinct.text(`Instinct ${game.bored}`);
});

// This is my favorite code in this
$("#reset").on("click", function(event) {
    window.location.reload(false); 
});

