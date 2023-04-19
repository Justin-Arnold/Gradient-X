<script setup lang="ts">
import { Application, Sprite, Assets, Container, Text } from 'pixi.js';

const app = new Application({
    width: 288, // width of the game screen
    height: 512, // height of the game screen
    backgroundColor: '#ded895' // background color of the canvas
});

const bg = await Assets.load('../../assets/bg.png');
const sprite = await Assets.load('../../assets/bird.png');
const pipe = await Assets.load('../../assets/tube.png');
const groundasset = await Assets.load('../../assets/ground.png');
let background: any, bird: any, pipes: any, ground: any;
let gameStarted = false;
let birdVelocity = 0;
let pipeTimer = 0;
const pipeInterval = 2000;
let score = 0;
const scoreText = new Text(`Score: ${score}`, {
    fontFamily: 'Arial',
    fontSize: 24,
    fill: 0xFFFFFF,
    align: 'center'
});
scoreText.position.set(app.screen.width / 2, 20);
scoreText.anchor.set(0.5);
app.stage.addChild(scoreText);
setup()

const gameOverContainer = new Container();
const gameOverText = new Text('Game Over!', {
  fontFamily: 'Arial',
  fontSize: 48,
  fill: 0xFFFFFF,
  align: 'center'
});
gameOverText.position.set(app.screen.width / 2, app.screen.height / 2 - 50);
gameOverText.anchor.set(0.5);
gameOverContainer.addChild(gameOverText);

const replayButton = new Text('Replay', {
  fontFamily: 'Arial',
  fontSize: 24,
  fill: 0xFFFFFF,
  align: 'center'
});
replayButton.position.set(app.screen.width / 2, app.screen.height / 2 + 50);
replayButton.anchor.set(0.5);
replayButton.interactive = true;
// replayButton.buttonMode = true;
replayButton.on('pointerup', () => {
  reset();
});
gameOverContainer.addChild(replayButton);

app.stage.addChild(gameOverContainer);
gameOverContainer.visible = false;

function reset() {
  // reset game state
    bird.y = app.screen.height / 2;
    birdVelocity = 0;
    score = 0;
    scoreText.text = `Score: ${score}`;
    pipes.removeChildren();
    pipeTimer = 0;

    gameOverContainer.visible = false;

    // set gameStarted to false
    gameStarted = false;

    // add event listeners for keydown and mousedown events
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleMouseDown);
}

function startGame() {
    if (!gameStarted) {
        gameStarted = true;
        reset();
        app.ticker.add(update);
        document.removeEventListener("keydown", handleKeyDown);
        document.removeEventListener("mousedown", handleMouseDown);
    }
}

// add event listeners for keydown and mousedown events


function handleKeyDown(event) {
    console.log(event.code);
  if (event.code === "Space") {
    startGame();
  }
}

function handleMouseDown(event) {
  if (event.button === 0) { // left mouse button
    startGame();
  }
}

onMounted(()=>{
    const anchor = document.getElementById('gameWrapper');
    if (!anchor) return;
    anchor.appendChild(app.view);

});


function setup() {
  // create background sprite
    background = new Sprite(bg);
    app.stage.addChild(background);
    ground = new Sprite(groundasset);
    ground.position.set(0, 380);;
    app.stage.addChild(ground);

    // create bird sprite
    bird = new Sprite(sprite);
    bird.position.set(50, 200);
    bird.scale.set(0.25, 0.25);
    app.stage.addChild(bird);

    // create pipes container
    pipes = new Container();
    app.stage.addChild(pipes);
}

function update(delta: number) {
  // apply gravity to bird
    birdVelocity += 0.001;
    bird.y += birdVelocity;

  // check for collision between bird and pipes
    pipes.children.forEach((pipe: any) => {
        if (bird.x + bird.width > pipe.x && bird.x < pipe.x + pipe.width) {
        if (bird.y < pipe.top || bird.y + bird.height > pipe.bottom) {
            // game over
            app.ticker.remove(update);
            gameOverContainer.visible = true;
        }
        }
    });

    if (bird.y > app.screen.height + bird.height / 2) {
        app.ticker.remove(update);
        gameOverContainer.visible = true;
    }

   // add new pipes
    pipeTimer += delta;
        if (pipeTimer >= pipeInterval) {
            addPipe();
            pipeTimer = 0;
        }

    // remove off-screen pipes
    pipes.children.forEach((pipe: any) => {
        if (pipe.x + pipe.width < 0) {
        pipes.removeChild(pipe);
        }
    });

    // check for scoring
    pipes.children.forEach((pipe: any) => {
        if (bird.x > pipe.x + pipe.width && !pipe.scored) {
        score++;
        pipe.scored = true;
        scoreText.text = `Score: ${score}`;
        }
    });
}

function addPipe() {
  const topPipe = new Sprite(pipe);
  const bottomPipe = new Sprite(pipe);

  topPipe.position.set(app.screen.width, -Math.random() * 300 - 200);
  bottomPipe.position.set(app.screen.width, topPipe.y + topPipe.height + 150);

  pipes.addChild(topPipe);
  pipes.addChild(bottomPipe);
}

</script>

<template>
    <Button @click="reset">Reset</Button>
    <div class="h-full w-full bg-slate-400 rounded-xl grid place-items-center" id="gameWrapper" @click="handleMouseDown">

    </div>
</template>