console.log("Sanity ✅");

// === INTERVAL / TIMER ===

// let gameTime = 0;
// setInterval(function(){
//     game.time += 1;
// }, 1000);

const game = {
    time: 0,
    evolutions: 0,
    progress: 0,

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