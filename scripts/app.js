console.log("Sanity ✅");

// Commented out for streamlined testing
// $("#name-modal").show();

$("#save-name").on("click", function(event) {
    $('#name-modal').hide();
    getName();
    game.startTimer();
});

const getName = function getName() {
    game.name = $("#char-name").val();
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
    name: '',
    hunger: 0,
    sleep: 0,
    bored: 0,

    // Game Methods
    startTimer() {
        setInterval(function(){
            game.time++;
            game.progress += 2;
            
            // button code
            game.hunger++;
            game.sleep++;
            game.bored++;
            $("#hunger").text(`Hunger ${game.hunger}`);
            $("#sleep").text(`Sleepiness ${game.sleep}`);
            $("#bored").text(`Boredom ${game.bored}`);
            game.buttonColorChange();

            // console.log(game.time);
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

    }
}

// Button onClick value reducer funtions
$("#hunger").on("click", function(event) {
    $("#hunger").text(`Hunger ${game.hunger}`);
    game.hunger--;
    game.buttonColorChange();
});
$("#sleep").on("click", function(event) {
    $("#sleep").text(`Sleepiness ${game.sleep}`);
    game.sleep--;
    game.buttonColorChange();
});
$("#bored").on("click", function(event) {
    $("#bored").text(`Boredom ${game.bored}`);
    game.bored--;
    game.buttonColorChange();
});
