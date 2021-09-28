console.log("Sanity ✅");

// Commented out for streamlined testing
// $("#name-modal").show();

$("#save-name").on("click", function(event) {
    $('#name-modal').hide();
    getName();
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

    // Game Methods
    startTimer() {
        setInterval(function(){
            game.time += 1;
            game.progress += 2;
            console.log(game.time);
            $("#dynamic").attr("aria-valuenow", game.progress).css("width", game.progress  + "%");
        }, 1000);
    }
}