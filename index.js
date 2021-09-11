let user_input = []
let simon = []
let level = 0
let [hasStarted, hasFinished] = [false, false]

function toggle(selector, new_class) {
    $(selector).addClass(new_class);
    setTimeout(()=>{$(selector).removeClass(new_class);},100)
}

function playAudio(path) {
    let audio = new Audio(path)
    audio.play()
}

function nextLevel() {
    if (!hasFinished) {
        user_input = []
        level += 1
        $("#level-title").text("Level " + level)
        let buttons = ["green", "red", "yellow", "blue"]
        let x = Math.floor(Math.random()*4)
        simon.push(buttons[x])
        toggle("#"+buttons[x], "pressed")
        playAudio("sounds/"+buttons[x]+".mp3")
    }
}

function checkAnswer() {
    let i =0
    for(i=0; i<user_input.length; i++) {
        if (simon[i]!=user_input[i]) {
            break
        }
    }
    if (i!==user_input.length) {
        wrongAnswer()
    }
    else {
        if (simon.length === user_input.length) {
            setTimeout(nextLevel, 750)
        }
    }
}

function wrongAnswer() {
    toggle("body", "red")
    $("#level-title").text("Game Over, Click the button to restart.")
    playAudio("sounds/wrong.mp3")
    $("#start").text("Restart").show();
    hasFinished = true
}

// Button to start the game.
$("#start").on("click", function() {
    $("#start").hide();
    simon = []
    level = 0
    hasStarted = true
    hasFinished = false
    nextLevel()
})

// Clicking buttons in the game.
$(".btn").click(
    function() {
        if(hasStarted && !hasFinished){
            let button = this.getAttribute("id")
            user_input.push(button)
            toggle("#"+button, "pressed")
            playAudio("sounds/"+button+".mp3")
            checkAnswer()
        }
        else if(hasFinished) {
            let button = this.getAttribute("id")
            playAudio("sounds/"+button+".mp3")
            wrongAnswer()
        }
        else {
            console.log("Click the button to start")
        }
    }
)