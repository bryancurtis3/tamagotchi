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



const game = {
    time: 0,
    evolutions: 0,
    progress: 0,
    totalProgress: 0,
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
            game.totalProgress += 1;
            
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
            // THIS IS IMPORTANT, LOSS CONDITION, ENABLE AFTER TESTING
            // if (game.rangeCheck() === true) {
            //     alert("You Lose!");
            //     clearInterval(interval);
            // }
            
            // Stage display value
            $("#stage").text(`Evolution: ${game.stage}`);

            // Progress bar
            $("#dynamic").attr("aria-valuenow", game.progress).css("width", game.progress  + "%");

            // Total progress bar
            $("#total-progress").attr("aria-valuenow", game.totalProgress).css("width", game.totalProgress  + "%");
        }, 1000);
    },

    // Function to change button color based on value
    buttonColorChange() {

        // Hunger Button
        if (game.hunger < 3) {
            $("#hunger").css("background-color", "#90be6d").css("color", "black");
        } else if (game.hunger >= 3 && game.hunger <= 6) {
            $("#hunger").css("background-color", "#f8961e").css("color", "black");
        } else if (game.hunger > 6) {
            $("#hunger").css("background-color", "#f94144").css("color", "white");
        };

        // Sleep Button
        if (game.sleep < 3) {
            $("#sleep").css("background-color", "#90be6d").css("color", "black");
        } else if (game.sleep >= 3 && game.sleep <= 6) {
            $("#sleep").css("background-color", "#f8961e").css("color", "black");
        } else if (game.sleep > 6) {
            $("#sleep").css("background-color", "#f94144").css("color", "white");
        };

        // Bored Button
        if (game.bored < 3) {
            $("#bored").css("background-color", "#90be6d").css("color", "black");
        } else if (game.bored >= 3 && game.bored <= 6) {
            $("#bored").css("background-color", "#f8961e").css("color", "black");
        } else if (game.bored > 6) {
            $("#bored").css("background-color", "#f94144").css("color", "white");
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
        
        // Checks for game progression and changes evolution and sprite accordingly
        if (game.progress === 100 && game.stage === 1) {
            game.progress = 0;
            $("#character-sprite").attr("src", "assets/amoeba.png");
            console.log($("#character-sprite").attr("src"))
            game.stage++;
        } else if (game.progress === 100 && game.stage === 2) {
            game.progress = 0;
            $("#character-sprite").attr("src", "assets/fish.png");
            console.log($("#character-sprite").attr("src"));
            game.stage++;
        } else if (game.progress === 100 && game.stage === 3) {
            game.progress = 0;
            $("#character-sprite").attr("src", "assets/primate.png");
            console.log($("#character-sprite").attr("src"));
            game.stage++;
        } else if (game.progress === 100 && game.stage === 4) {
            game.progress = 0;
            $("#character-sprite").attr("src", "assets/caveman.gif");
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