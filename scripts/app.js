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

// game.startTimer();
$("#save-name").on("click", function(event) {
    $("#name-modal").hide();
    getName();
    game.startTimer();
});

$("#play-again").on("click", function(event) {
    window.location.reload(false); 
});

$("#admit-defeat").on("click", function(event) {
    $("#loss-modal").hide();
    // add something dramatic
});

const getName = function getName() {
    game.name = $("#char-name").val();
    $("#character").text(`Character: ${game.name}`);
}


// === INTERVAL / TIMER ===
// const direction = setInterval(function(){
//     let movement = $(".x").css("transform");
//     movement = movement.split("(");
//     movement = movement[1].split(",");
//     movement = parseInt(movement[4]);
//     // console.log(movement)
//     if (movement <= 8) {
//         $("#sprite").css("-webkit-transform", "")
//         console.log($characterSprite.css("-webkit-transform"));
//     } else if (movement >= 660) {
//         $("#sprite").css("-webkit-transform", "scaleX(-1);")
//         console.log($characterSprite.css("-webkit-transform"));
//     }
// }, 20);



const game = {
    time: 0,
    evolutions: 0,
    progress: 0,
    stage: 1,
    name: '',
    // values: {
    //     hunger: 0,
    //     sleep: 0,
    //     bored: 0,
    // },
    clicks: {
        hunger: 0,
        sleep: 0,
        bored: 0,
    },
    hunger: 0,
    sleep: 0,
    bored: 0,

    // ===== Game Methods =====

    // Pretty much everything to do with timers at the moment
    startTimer() {
        const interval = setInterval(function(){
            game.time++;
            game.progress += 5;
            
            // button code
            game.hunger++;
            game.sleep++;
            game.bored++;
            // game.values.hunger++;
            // game.values.sleep++;
            // game.values.bored++;
            $resilience.text(`Resilience ${game.hunger}`);
            $genetics.text(`Genetics ${game.sleep}`);
            $instinct.text(`Instinct ${game.bored}`);
            game.buttonColorChange();
            game.progressCheck();
            // THIS IS IMPORTANT, LOSS CONDITION, ENABLE AFTER TESTING
            if (game.rangeCheck() === true) {
                $characterSprite.attr("src", "assets/skull.png");
                // Maybe change from alert, prevents sprite from changing
                $("#loss-modal").show();
                clearInterval(interval);
            }
            
            // TEMP CODE MAYBE



            // Stage display value
            $("#stage").text(`Evolution: ${game.stage}`);

            // Progress bar
            $("#dynamic").attr("aria-valuenow", game.progress).css("width", game.progress  + "%");

            // Total progress bar
            $("#total-progress").attr("aria-valuenow", game.time).css("width", game.time  + "%");

            // Endgame
            if (game.time >= 100) {
                $("#main-container").addClass("x");
                // $(".main").addClass("y");
                
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

    // Considering organizing and condensing button code into functions
    buttonClick() {

    },

    // Maybe a one stop function for keeping values from between 0-10
    rangeCheck() {
        // Checks if above 0 and below 11
        // Hunger
        if (game.hunger < 0) {
            game.hunger = 0;
        };
        // Sleep
        if (game.sleep < 0) {
            game.sleep = 0;
        };
        // Bored
        if (game.bored < 0) {
            game.bored = 0;
        };
        if (game.hunger >= 11 || game.sleep >= 11 ||game.bored >= 11) return true;
    },

    // Checks for game progression and changes evolution and sprite accordingly
    progressCheck() {
        
        // MOVE THIS TO rangeCheck() ??
        // Jellyfish ending
        if (game.progress === 100 && game.stage === 2 && game.clicks.hunger / game.clicks.sleep >= 2 && game.clicks.hunger / game.clicks.bored >= 2) {
            $characterSprite.attr("src", "assets/jelly.gif");
            $("#loss-text").text("You are a jellyfish... this is your final form");
            $("#admit-defeat").text("Remain Gelatinous");
            $("#loss-modal").show();

            console.log($characterSprite.attr("src"));
            // Fix this
            clearInterval(interval);
            return;
        };

        // Gator ending
        if (game.progress === 100 && game.stage === 3 && game.clicks.bored / game.clicks.sleep >= 2 && game.clicks.bored / game.clicks.hunger >= 2) {
            $characterSprite.attr("src", "assets/gator.png");
            $("#loss-text").text("You are an alligaor... this is your final form");
            $("#admit-defeat").text("Embrace Gaterdome");
            $("#loss-modal").show();

            console.log($characterSprite.attr("src"));
            // Fix this
            clearInterval(interval);
            return;
        };

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












// Button onClick value reducer funtions
$resilience.on("click", function(event) {
    $resilience.text(`Resilience ${game.hunger}`);
    game.hunger--;
    game.buttonColorChange();
    game.rangeCheck();
    game.clicks.hunger++;
});
$genetics.on("click", function(event) {
    $genetics.text(`Genetics ${game.sleep}`);
    game.sleep--;
    game.buttonColorChange();
    game.rangeCheck();
    game.clicks.sleep++;
});
$instinct.on("click", function(event) {
    $instinct.text(`Instinct ${game.bored}`);
    game.bored--;
    game.buttonColorChange();
    game.rangeCheck();
    game.clicks.bored++;
});

// This is my favorite code in this
$("#reset").on("click", function(event) {
    window.location.reload(false); 
});

