        
        
// taken from 

// console.log(Object.keys(game.values)[0])

        // DRYING ATTEMPT -- failed
        // for (let i = 0; i < Object.values(game.values).length; i++) {
        //     let value = Object.values(game.values)[i];
        //     const key = Object.keys(game.values)[i];
        //     console.log(value)
        //     value = parseInt(value);
        //     console.log(`$${key}`);
            
        //     if (value < 3) {
        //         $(`$${key}`).removeClass("btn-warning btn-danger").addClass("btn-success");
        //     } else if (value >= 3 && value <= 6) {
        //         $(`$${key}`).removeClass("btn-danger btn-success").addClass("btn-warning");
        //     } else if (value > 6) {
        //         $(`$${key}`).removeClass("btn-success btn-warning").addClass("btn-danger");
        //     };
        // }


// button badge span code

    // <span id="hunger-num" class="badge bg-light text-dark"></span>






// Button bootstrap code

        // Hunger Button
        // if (game.hunger < 3) {
        //     $("#hunger").removeClass("btn-warning btn-danger").addClass("btn-success");
        // } else if (game.hunger >= 3 && game.hunger <= 6) {
        //     $("#hunger").removeClass("btn-danger btn-success").addClass("btn-warning");
        // } else if (game.hunger > 6) {
        //     $("#hunger").removeClass("btn-success btn-warning").addClass("btn-danger");
        // };

        // Sleep Button
        // if (game.sleep < 3) {
        //     $("#sleep").removeClass("btn-warning btn-danger").addClass("btn-success");
        // } else if (game.sleep >= 3 && game.sleep <= 6) {
        //     $("#sleep").removeClass("btn-danger btn-success").addClass("btn-warning");
        // } else if (game.sleep > 6) {
        //     $("#sleep").removeClass("btn-success btn-warning").addClass("btn-danger");
        // };

        // Bored Button
        // if (game.bored < 3) {
        //     $("#bored").removeClass("btn-warning btn-danger").addClass("btn-success");
        // } else if (game.bored >= 3 && game.bored <= 6) {
        //     $("#bored").removeClass("btn-danger btn-success").addClass("btn-warning");
        // } else if (game.bored > 6) {
        //     $("#bored").removeClass("btn-success btn-warning").addClass("btn-danger");
        // };





// Old range check code when timer was in a method inside game object

    // THIS IS IMPORTANT, LOSS CONDITION, ENABLE AFTER TESTING
    // if (game.rangeCheck() === true) {
    //     $characterSprite.attr("src", "assets/skull.png");
    //     $("#loss-modal").show();
    //     clearInterval(interval);
    // }



// === INTERVAL / TIMER ===
// const direction = setInterval(function(){
//     let movement = $(".x").css("transform");
//     movement = movement.split("(");
//     movement = movement[1].split(",");
//     movement = parseInt(movement[4]);
//     console.log(movement)
//     if (movement <= 8) {
//         $("#sprite").css("-webkit-transform", "")
//         console.log($characterSprite.css("-webkit-transform"));
//     } else if (movement >= 600) {
//         $("#sprite").css("-webkit-transform", "scaleX(-1);")
//         console.log($characterSprite.css("-webkit-transform"));
//     }
// }, 20);