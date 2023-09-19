let inputDir = { x: 0, y: 0 };
const foodSound = new Audio('assets/food.mp3');
const gameoverSound = new Audio('assets/gameover.mp3');
const moveSound = new Audio('assets/move.mp3');
const musicSound = new Audio('assets/music.mp3');
const level = document.getElementById('level'); // Assuming you have an element with the id 'level'
let speed = 5;
let lastPaintTime = 0;
let snakeArr = [
    { x: 13, y: 15 }
];
food = { x: 6, y: 7 };
let score = 0;



//game function
function main(ctime) {
    window.requestAnimationFrame(main);
    if (level.innerText.includes("Easy")) {
        speed = 5;
    }
    if (level.innerText.includes("Medium")) {
        speed = 10;
    }
    if (level.innerText.includes("Hard")) {
        speed = 15;
    }
    if (level.innerText.includes("Pro")) {
        speed = 20;
    }
    if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}

function isCollide(snake) {
    //bumb into oneself
    for (let i = 1; i < snakeArr.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            return true;
        }
    }
    // bump into wall
    if (snakeArr[0].x >= 18 || snakeArr[0].x <= 0 || snakeArr[0].y >= 18 || snakeArr[0].y <= 0) {
        return true;
    }

}
function gameEngine() {
    //part1: updating the snake array and food
    if (isCollide(snakeArr)) {
        gameoverSound.play();
        musicSound.pause();
        inputDir = { x: 0, y: 0 };
        alert("Game Over...!! Press any key to play again.");
        snakeArr = [
            { x: 13, y: 15 }
        ];
        score = 0;
        if (btn.innerText.includes("ON")) {
            musicSound.play();
        }
    }
    //if you have eaten the food to increment the score and size of the snake
    if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
        foodSound.play()
        score += 1;
        scorebox.innerHTML = "Score : " + score;
        snakeArr.unshift({ x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y });
        let a = 2;
        let b = 16;
        food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) };
    }
    //to move the snake
    for (let i = snakeArr.length - 2; i >= 0; i--) {
        snakeArr[i + 1] = { ...snakeArr[i] };
    }
    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;

    //part2: display the snake and food
    board.innerHTML = "";
    //display snake
    snakeArr.forEach((e, index) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if (index === 0) {
            snakeElement.classList.add('head');
        }
        else {
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    });

    //display food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food')
    board.appendChild(foodElement)
}


//game logic
window.requestAnimationFrame(main);
window.addEventListener('keydown', e => {
    inputDir = { x: 0, y: 0 };    //start the game
    moveSound.play();

    switch (e.key) {
        case "ArrowUp":
            console.log("up");
            inputDir.x = 0;
            inputDir.y = -1;
            break;
        case "ArrowDown":
            console.log('down');
            inputDir.x = 0;
            inputDir.y = 1;
            break;
        case "ArrowLeft":
            console.log('left');
            inputDir.x = -1;
            inputDir.y = 0;
            break;
        case "ArrowRight":
            console.log('right');
            inputDir.x = 1;
            inputDir.y = 0;
            break;

        default:
            break;
    }
});

//level 


level.addEventListener('click', () => {
    if (level.innerText.includes("Easy")) {
        level.innerText = "Medium";
        level.style.background = "yellow";
        level.style.color = "black";
    } else if (level.innerText.includes("Medium")) {
        level.style.background = "orange";
        level.innerText = "Hard";
        level.style.color = "white";
    } else if (level.innerText.includes("Hard")) {
        level.style.background = "red";
        level.innerText = "Pro";
        level.style.color = "white";
    } else if (level.innerText.includes("Pro")) {
        level.style.background = "green";
        level.innerText = "Easy";
        level.style.color = "white";
    }
});

btn.addEventListener('click', () => {
    if (btn.innerText.includes("OFF")) {
        musicSound.play();
        btn.innerText = "Music : ON";
        btn.style.background = "Green";
    }
    else {
        btn.innerText = "Music : OFF";
        btn.style.background = "red";
        musicSound.pause();
    }
})
up.addEventListener("click", () => {
    moveSound.play();
    inputDir.x = 0;
    inputDir.y = -1;
})
down.addEventListener("click", () => {
    moveSound.play();
    inputDir.x = 0;
    inputDir.y = 1;
})
left.addEventListener("click", () => {
    moveSound.play();
    inputDir.x = -1;
    inputDir.y = 0;
})
right.addEventListener("click", () => {
    moveSound.play();
    inputDir.x = 1;
    inputDir.y = 0;
})