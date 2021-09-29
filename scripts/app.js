console.log("Sanity ✅");

// Commented out for streamlined testing
// $("#name-modal").show();

// game.startTimer();
$("#save-name").on("click", function(event) {
    $('#name-modal').hide();
    getName();
    game.startTimer();
});

const getName = function getName() {
    game.name = $("#char-name").val();
    $("#character").text(`Character: ${game.name}`);
}


// === INTERVAL / TIMER ===

// let gameTime = 0;
// setInterval(function(){
//     game.time += 1;
// }, 1000);

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

    // Game Methods
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
            $("#hunger").text(`Hunger ${game.hunger}`);
            $("#sleep").text(`Sleepiness ${game.sleep}`);
            $("#bored").text(`Boredom ${game.bored}`);
            game.buttonColorChange();
            game.progressCheck();
            // if (game.rangeCheck() === true) {
            //     alert("You Lose!");
            //     clearInterval(interval);
            // }
            
            // Stage display value
            $("#stage").text(`Evolution: ${game.stage}`);

            // Progress bar
            $("#dynamic").attr("aria-valuenow", game.progress).css("width", game.progress  + "%");
        }, 1000);
    },

    // Function to change button color based on value
    buttonColorChange() {

        // Hunger Button
        if (game.hunger < 3) {
            $("#hunger").removeClass("btn-warning btn-danger").addClass("btn-success");
        } else if (game.hunger >= 3 && game.hunger <= 6) {
            $("#hunger").removeClass("btn-danger btn-success").addClass("btn-warning");
        } else if (game.hunger > 6) {
            $("#hunger").removeClass("btn-success btn-warning").addClass("btn-danger");
        };

        // Sleep Button
        if (game.sleep < 3) {
            $("#sleep").removeClass("btn-warning btn-danger").addClass("btn-success");
        } else if (game.sleep >= 3 && game.sleep <= 6) {
            $("#sleep").removeClass("btn-danger btn-success").addClass("btn-warning");
        } else if (game.sleep > 6) {
            $("#sleep").removeClass("btn-success btn-warning").addClass("btn-danger");
        };

        // Bored Button
        if (game.bored < 3) {
            $("#bored").removeClass("btn-warning btn-danger").addClass("btn-success");
        } else if (game.bored >= 3 && game.bored <= 6) {
            $("#bored").removeClass("btn-danger btn-success").addClass("btn-warning");
        } else if (game.bored > 6) {
            $("#bored").removeClass("btn-success btn-warning").addClass("btn-danger");
        };
    },

    // Trying to organize and condense button code into functions
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

    progressCheck() {
        
        if (game.progress === 100 && game.stage === 1) {
            console.warn("100 reached")
            game.progress = 0;
            $("#character-sprite").attr("src", "assets/amoeba.png");
            console.log($("#character-sprite").attr("src"))
            game.stage++;
        } else if (game.progress === 100 && game.stage === 2) {
            console.warn("200 reached")
            game.progress = 0;
            $("#character-sprite").attr("src", "assets/fish.png");
            console.log($("#character-sprite").attr("src"));
            game.stage++;
        };
    },
}; // ===== END OF GAME OBJECT =====

// console.log(Object.keys(game.values)[0])

// Button onClick value reducer funtions
$("#hunger").on("click", function(event) {
    $("#hunger").text(`Hunger ${game.hunger}`);
    game.hunger--;
    game.buttonColorChange();
    game.rangeCheck();
    game.clicks.hunger++;
});
$("#sleep").on("click", function(event) {
    $("#sleep").text(`Sleepiness ${game.sleep}`);
    game.sleep--;
    game.buttonColorChange();
    game.rangeCheck();
    game.clicks.sleep++;
});
$("#bored").on("click", function(event) {
    $("#bored").text(`Boredom ${game.bored}`);
    game.bored--;
    game.buttonColorChange();
    game.rangeCheck();
    game.clicks.bored++;
});