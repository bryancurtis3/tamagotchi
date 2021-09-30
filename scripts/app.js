console.log("Sanity ✅");


// This is my attempt to see if I understand correctly how to push to a different branch, fingers crossed

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
let game = null;
$("#save-name").on("click", function(event) {
    $("#name-modal").hide();
    
    
    // gameStart();
    let charName = "";
    let diff = 1;
    const getName = function getName() {
        charName = $("#char-name").val();
    }
    getName();
    const getDifficulty = function getDifficulty() {
        diff = $("#diff").val();
    }    
    getDifficulty();

    game = new Session(charName, diff);
    starter();
});

$("#play-again").on("click", function(event) {
    window.location.reload(false); 
});

$("#admit-defeat").on("click", function(event) {
    $("#loss-modal").hide();
    $("body").css("filter", "blur(50px)").css("transition", "filter 100s");
});

// const getName = function getName() {
//     const charName = $("#char-name").val();
// }

// const getDifficulty = function getDifficulty() {
//     const diff = $("#diff").val();
// }




let interval = null;
const starter = function starter() {
    interval = setInterval(function(){
    game.time++;
    game.progress += 5;
    
    game.hunger += 1 * game.difficulty;
    game.sleep += 1  * game.difficulty;
    game.bored += 1  * game.difficulty;

    $resilience.text(`Resilience ${game.hunger}`);
    console.log(game.hunger)
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
    }
    }, 1000);
} // === END INTERVAL / TIMER FUNCTION ===





class Session {
    constructor(difficulty=1, charName="Ronald") {
        this.time = 0,
        this.evolutions = 0,
        this.progress = 0,
        this.stage = 1,
        this.name = charName,
        this.clicks = {
            hunger: 0,
            sleep: 0,
            bored: 0,
        },
        this.hunger = 0,
        this.sleep = 0,
        this.bored = 0
        this.difficulty = difficulty;
    }

    // Method to change button color based on value
    buttonColorChange() {
    
        // Hunger Button
        if (this.hunger < 3) {
            $resilience.css("background-color", "#90be6d").css("color", "black");
        } else if (this.hunger >= 3 && this.hunger <= 6) {
            $resilience.css("background-color", "#f8961e").css("color", "black");
        } else if (this.hunger > 6) {
            $resilience.css("background-color", "#f94144").css("color", "white");
        };

        // Sleep Button
        if (this.sleep < 3) {
            $genetics.css("background-color", "#90be6d").css("color", "black");
        } else if (this.sleep >= 3 && this.sleep <= 6) {
            $genetics.css("background-color", "#f8961e").css("color", "black");
        } else if (this.sleep > 6) {
            $genetics.css("background-color", "#f94144").css("color", "white");
        };

        // Bored Button
        if (this.bored < 3) {
            $instinct.css("background-color", "#90be6d").css("color", "black");
        } else if (this.bored >= 3 && this.bored <= 6) {
            $instinct.css("background-color", "#f8961e").css("color", "black");
        } else if (this.bored > 6) {
            $instinct.css("background-color", "#f94144").css("color", "white");
        };
    }

    // Maybe a one stop function for keeping values from between 0-10
    rangeCheck() {
        // Checks if above 0 and below 11
        // Resilience
        if (this.hunger < 0) {
            this.hunger = 0;
        };
        // Genetics
        if (this.sleep < 0) {
            this.sleep = 0;
        };
        // Instinct
        if (this.bored < 0) {
            this.bored = 0;
        };
        if (this.hunger >= 11 || this.sleep >= 11 ||this.bored >= 11 && this.stage !== 6) {
            $characterSprite.attr("src", "assets/skull.png");
            $("#loss-modal").show();
            clearInterval(interval);
        } else if (this.hunger >= 11 || this.sleep >= 11 ||this.bored >= 11 && this.stage === 6 && this.time >= 120) {
            $("#loss-title").text("Triumph!");
            $("#loss-text").text("You have transcended the Circle of Life, well done.");
            $("#admit-defeat").text("Revel");
            $("#loss-modal").show();
        } else if (this.hunger >= 11 || this.sleep >= 11 ||this.bored >= 11 && this.stage === 6 && this.time < 120) {
            $("#loss-title").text("Game Over");
            $("#loss-text").text("Bitter defeat at the hands of the Singularity...");
            $("#admit-defeat").text("Self Loathe");
            $("#play-again").text("Seek Redemption");
            $("body").css("filter", "blur(50px)").css("transition", "filter 45s");
            $("#loss-modal").show();
        }
    }

    // Checks for game progression and changes evolution and sprite accordingly and checks for secret ending states
    progressCheck() {

        // Jellyfish ending
        if (this.progress === 100 && this.stage === 2 && this.clicks.hunger / this.clicks.sleep >= 1.8 && this.clicks.hunger / this.clicks.bored >= 1.8) {
            $characterSprite.attr("src", "assets/jelly.gif");
            $("#loss-text").text("You are a jellyfish... this is your final form");
            $("#admit-defeat").text("Remain Gelatinous");
            $("#loss-modal").show();
            // Fix this
            clearInterval(interval);
            return;
        };

        // Gator ending
        if (this.progress === 100 && this.stage === 3 && this.clicks.bored / this.clicks.sleep >= 1.5 && this.clicks.bored / this.clicks.hunger >= 1.5) {
            $characterSprite.attr("src", "assets/gator.png");
            $("#loss-text").text("You are an alligaor... this is your final form");
            $("#admit-defeat").text("Embrace Gaterdome");
            $("#loss-modal").show();
            // Fix this
            clearInterval(interval);
            return;
        };

        // Cincinnati Zoo ending
        if (this.progress === 100 && this.stage === 4 && this.clicks.sleep / this.clicks.bored >= 1.3 && this.clicks.sleep / this.clicks.hunger >= 1.3) {
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
        if (this.progress === 100 && this.stage === 1) {
            this.progress = 0;
            $characterSprite.attr("src", "assets/amoeba.png");
            console.log($characterSprite.attr("src"))
            this.stage++;
        } else if (this.progress === 100 && this.stage === 2) {
            this.progress = 0;
            $characterSprite.attr("src", "assets/fish.png");
            console.log($characterSprite.attr("src"));
            this.stage++;
        } else if (this.progress === 100 && this.stage === 3) {
            this.progress = 0;
            $characterSprite.attr("src", "assets/primate.png");
            console.log($characterSprite.attr("src"));
            this.stage++;
        } else if (this.progress === 100 && this.stage === 4) {
            this.progress = 0;
            $characterSprite.attr("src", "assets/caveman.gif");
            console.log($characterSprite.attr("src"));
            this.stage++;
        };
    }
}








// Button onClick value reducer fucntions
$resilience.on("click", function(event) {
    game.hunger--;
    game.rangeCheck();
    game.buttonColorChange();
    game.clicks.hunger++;
    $resilience.text(`Resilience ${game.hunger}`);
});
$genetics.on("click", function(event) {
    game.sleep--;
    game.rangeCheck();
    game.buttonColorChange();
    game.clicks.sleep++;
    $genetics.text(`Genetics ${game.sleep}`);
});
$instinct.on("click", function(event) {
    game.bored--;
    game.rangeCheck();
    game.buttonColorChange();
    game.clicks.bored++;
    $instinct.text(`Instinct ${game.bored}`);
});

// This is my favorite code in this
$("#reset").on("click", function(event) {
    window.location.reload(false); 
});

