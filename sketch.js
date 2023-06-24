var bgimg, bg;
var gameState = "wait"
var cheeseimg, breadimg, paproniimg, basilimg
var waterbuket, tomato, mushroom, lettuce, money, farm, carrot, basket
var girl, girlseed, girlwater
var storybutton, mutebutton, unmutebutton, nextbutton, playbutton
var ground, groundimg, ground2, ground2Group, seed1, crops, cropsGroup
var score = 0
var timer = 10
var score2 = 0
var timer2 = 10
var score3 = 0
var timer3 = 25
var marketimg,gamemusic,diesound

function preload() {
    bgimg = loadImage("assets/splash.gif")
    marketimg = loadImage("assets/market.png")
    groundimg = loadImage("lee-main/barrenland.jpg")
    girlwater = loadImage("assets/girl_water-removebg-preview.png")
    girlseed = loadImage("assets/girl_seed-removebg-preview.png")
    girl = loadImage("assets/girl-removebg-preview.png")
    lettuce = loadImage("assets/lettuce.png")
    mushroom = loadImage("assets/mushrooms.png")
    tomato = loadImage("assets/tomato.png")
    // waterbuket=loadImage("assets/waterbuket.png")
    // money=loadImage("assets/money.png")
    // farm=loadImage("assets/farm.png")
    carrot = loadImage("assets/carrot.png")
    // basket=loadImage("assets/basket(1).png")
    playerwalkimg = loadAnimation("back1.png", "back2.png")
    playerwalkrightimg = loadAnimation("back1right.png", "back2right.png")

    // level 2 images
    barrenimg = loadImage("lee-main/barrenland.jpg")
    sowedimg = loadImage("assets/sowedgroundtile.PNG")


    // level 3 sell crops -hut
    hut1img = loadImage("assets/h1.png")
    hut2img = loadImage("assets/h2.png")
    hut3img = loadImage("assets/h3.png")
    hut4img = loadImage("assets/h4.png")

    level3bgimg = loadImage("assets/level3bg.PNG")

    harvest1 = loadImage("assets/harvest1.png")
    harvest2 = loadImage("assets/harvest2.png")
    harvest3 = loadImage("assets/harvest3.png")
    harvest4 = loadImage("assets/harvest4.png")
    harvest5 = loadImage("assets/harvest5.png")
    harvest6 = loadImage("assets/harvest6.png")


    bgmusic=loadSound("assets/sounds_bgMusic2.mp3")

bgmusic.setVolume(0.1)


diesound=loadSound("lifelost.wav")

}


function setup() {
    createCanvas(windowWidth, windowHeight)



    playbutton = createImg("lee-main/play.png")
    playbutton.position(width - 200, height / 2.75 - 50)
    playbutton.size(200, 200)

    musicbutton = createImg("lee-main/music.png")
    musicbutton.position(width - 200, height - (height - 50))
    musicbutton.size(200, 200)

    nextbutton = createImg("lee-main/next.png")
    nextbutton.position(width - 600, height - (height / 3.3))
    nextbutton.size(100, 100)
    nextbutton.hide()

    backbutton = createImg("lee-main/back.png")
    backbutton.position(width - 1000, height - (height / 3.3))
    backbutton.size(100, 100)
    backbutton.hide()

    mutebutton = createImg("lee-main/nomusic.png")
    mutebutton.position(width - 200, height - (height - 50))
    mutebutton.size(200, 200)
    mutebutton.hide()


    infobutton = createImg("lee-main/info.gif")
    infobutton.position(0, 0)
    infobutton.size(width, height)
    infobutton.hide()

    ground = createSprite(width / 2, height / 2)
    ground.addImage(groundimg)
    ground.visible = false
    ground.scale = 5
    // groundimg.resize(width,height)
    ground.velocityY = 3
    // ground.shapeColor="red"
    ground.y = ground.height / 2



    seedsGroup = new Group()
    ground2Group = new Group()
    cropsGroup = new Group()
    seed1Group = new Group()


    // animation speed regulate
    playerwalkimg.frameDelay = 10;
    playerwalkrightimgframeDelay = 10;

    // character
    girl = createSprite(150, height - 180)
    girl.addAnimation("walkleft", playerwalkimg)
    girl.addAnimation("walkright", playerwalkrightimg)

    girl.visible = false
    girl.scale = 0.5


    // hut
    hut = createSprite(width / 2, height / 2)
    hut.scale = 2
    hut.addImage("hut1", hut1img)
    hut.addImage("hut2", hut2img)
    hut.addImage("hut3", hut3img)
    hut.addImage("hut4", hut4img)
    hut.visible = false



    

}




function draw() {

    musicbutton.mousePressed(() => {
        // gameState="mute"
        musicbutton.hide()
        mutebutton.show()
        bgmusic.play()
    })

    mutebutton.mousePressed(() => {
        // gameState="mute"
        musicbutton.show()
        mutebutton.hide()
        bgmusic.stop()
    })

    if (gameState === "wait") {
        background(bgimg)
    }


    playbutton.mousePressed(() => {
        playbutton.hide()
        infobutton.show()

    })


    infobutton.mousePressed(() => {
        gameState = "Level1"
        playbutton.hide()
        infobutton.hide()

    })

    musicbutton.mousePressed(() => {
        // gameState="mute"
        musicbutton.hide()
        mutebutton.show()
        bgmusic.play()
    })

    mutebutton.mousePressed(() => {
        // gameState="mute"
        musicbutton.show()
        mutebutton.hide()
        bgmusic.stop()
    })

    if (gameState === "Level1") {
        ground.visible = true
        mutebutton.hide()
        musicbutton.hide()
        girl.visible = true
        if (ground.y > height) {
            ground.y = ground.height / 2
        }

        spawnSeeds()
        seedsGroup.overlap(girl, collectSeed);


        // timer codes
        if (frameCount % 60 == 0 && timer > 0) {
            timer--;
        }
        if (timer == 0) {
            gameState = "over"
        }

        if (score == 1 && timer >= 0) {
            seedsGroup.destroyEach()
            level1Won()
        }

    }


    musicbutton.mousePressed(() => {
        // gameState="mute"
        musicbutton.hide()
        mutebutton.show()
        bgmusic.play()
    })

    mutebutton.mousePressed(() => {
        // gameState="mute"
        musicbutton.show()
        mutebutton.hide()
        bgmusic.stop()
    })



    if (gameState === "Level2") {
        background("#9E6F21")
        girl.visible = true
        girl.x=mouseX
        girl.y=mouseY
        ground.visible = false



        // timer codes
        if (frameCount % 60 == 0 && timer2 > 0) {
            timer2--;
        }
        if (timer2 == 0) {
            gameState = "over"
        }

        if (score2 == 10 && timer2 >= 0) {

            level2Won()

        }

    }

    if (gameState == "over") {
  
        cropsGroup.destroyEach()
       
        GameOver()
    }
    if (gameState == "Level3") {
        background(level3bgimg)
        girl.visible = true
        ground.visible = false
        seed1Group.destroyEach()
        sellCrop()

        cropsGroup.overlap(girl, buildHut);
        // timer codes
        if (frameCount % 60 == 0 && timer3 > 0) {
            timer3--;
        }
        if (timer3 == 0) {
            gameState = "over"
        }

        if (score3 == 6 && timer3 >= 0) {

            girl.remove()
            level3Won()
        }

    }



    drawSprites()

    if (gameState === "Level1") {
        fill("yellow")
        stroke("red")
        strokeWeight(2)
        textSize(20)
        text("Seeds Collected : " + score, width - 250, 50)

        textSize(40)
        stroke(0)

        fill("green")
        strokeWeight(6)

        text(gameState, width / 2 - 100, 50)

        fill("yellow")
        stroke("red")
        strokeWeight(2)
        textSize(20)
        text("Time Left : " + timer, 100, 50)
    }



    if (gameState === "Level2") {
        fill("yellow")
        stroke("red")
        strokeWeight(2)
        textSize(20)
        text("Seeds Sowed : " + score2, width - 250, 50)

        textSize(40)
        stroke(0)

        fill("red")
        strokeWeight(6)

        text(gameState, width / 2 - 100, 50)

        fill("yellow")
        stroke("red")
        strokeWeight(2)
        textSize(20)
        text("Time Left : " + timer2, 100, 50)
    }


    if (gameState === "Level3") {
        fill("yellow")
        stroke("red")
        strokeWeight(2)
        textSize(20)
        text("Seeds Sowed : " + score3, width - 250, 50)

        textSize(40)
        stroke(0)

        fill("red")
        strokeWeight(6)

        text(gameState, width / 2 - 100, 50)

        fill("yellow")
        stroke("red")
        strokeWeight(2)
        textSize(20)
        text("Time Left : " + timer3, 100, 50)
    }

}




// //level 1 won function
function level1Won() {

    swal(
        {

            title: `You had a great CROP.. HARVEST It NOW!!!`,
            text: "Click on the vegetables to Sell Them",
            imageUrl: "assets/girl_water-removebg-preview.png",
            imageSize: "250x250",
            confirmButtonText: "LEVEL 2",
            confirmButtonColor: "cyan"
        },
        function (isConfirm) {
            if (isConfirm) {
                gameState = "Level2"
            }
        }
    )
}


//collect seeds
function collectSeed() {
    seedsGroup.destroyEach()
    score++;
    girl.addAnimation("walkleft", playerwalkimg)


}


function buildHut() {
    cropsGroup.destroyEach()
    score3++;
    hut.visible = true
    girl.addAnimation("walkleft", playerwalkimg)
    if (score3 == 1) {

        hut.changeImage("hut2")

    }

    else if (score3 == 3) {

        hut.changeImage("hut3")

    }


    else if (score3 == 5) {

        hut.changeImage("hut4")

    }


}


function spawnSeeds() {

    if (frameCount % 120 == 0) {
        var randX = Math.round(random(100, width - 100))
        seeds = createSprite(randX, 0)
        seeds.velocityY = 4
        seeds.scale = 0.25


        rand = Math.round(random(1, 4))
        switch (rand) {
            case 1: seeds.addImage(lettuce)
                break;

            case 2: seeds.addImage(mushroom)
                seeds.scale = 0.5
                break;

            case 3: seeds.addImage(tomato)
                break;

            case 4: seeds.addImage(carrot)
                break;

            default: break;


        }

        seedsGroup.add(seeds)

    }
}

//   movement function
function keyPressed() {

    if (keyCode === RIGHT_ARROW) {
        girl.velocityX = 5
        girl.velocityY = 0
        // girl.changeImage("girlgetright", girlgetright)
        girl.changeAnimation("walkright", playerwalkrightimg)

    }
    if (keyCode === LEFT_ARROW) {
        girl.velocityX = -5
        girl.velocityY = 0
        girl.changeAnimation("walkleft", playerwalkimg)

        // girl.changeImage("girlgetleft",girlgetleft)
    }


    if (keyCode === UP_ARROW) {
        girl.velocityY = -10
        girl.velocityX = 0
        // girl.changeImage("girlgetright", girlgetright)
        girl.changeAnimation("walkleft", playerwalkimg)

    }

    if (keyCode === DOWN_ARROW) {
        girl.velocityY = 10
        girl.velocityX = 0
        // girl.changeImage("girlgetright", girlgetright)
        girl.changeAnimation("walkright", playerwalkrightimg)
    }
    if (keyCode === 32 && gameState == "Level2") {
        girl.velocityY = 0
        girl.velocityX = 0
        // girl.changeImage("girlgetright", girlgetright)
        girl.changeAnimation("walkright", playerwalkrightimg)
        seed1 = createSprite(mouseX, mouseY)
        seed1.addImage(sowedimg)
        seed1.scale = 0.5
        seed1Group.add(seed1)
        score2++
    }


}

function keyReleased() {


    if (keyCode === LEFT_ARROW) {
        girl.velocityX = 0
        girl.velocityY = 0
        girl.changeAnimation("walkleft", playerwalkimg)
    }



    if (keyCode === RIGHT_ARROW) {
        girl.velocityX = 0
        girl.velocityY = 0
        girl.changeAnimation("walkright", playerwalkrightimg)
    }

    if (keyCode === UP_ARROW) {
        girl.velocityY = 0
        girl.velocityX = 0
        // girl.changeImage("girlgetright", girlgetright)

    }



    if (keyCode === DOWN_ARROW) {
        girl.velocityY = 0
        girl.velocityX = 0
        // girl.changeImage("girlgetright", girlgetright)

    }

    if (keyCode === 32 && gameState == "Level2") {
        girl.velocityY = 0
        girl.velocityX = 0
        // girl.changeImage("girlgetright", girlgetright)
        girl.changeAnimation("walkright", playerwalkrightimg)

    }
}


// level2 won
function level2Won() {

    swal(
        {

            title: `You are a ROCKSTAR!!!`,
            text: "Touch the Crops to Sell Them!!",
            imageUrl: "assets/market.png",
            imageSize: "250x250",
            confirmButtonText: "LEVEL 3",
            confirmButtonColor: "cyan"
        },
        function (isConfirm) {
            if (isConfirm) {
                gameState = "Level3"
            }
        }
    )
}


function sellCrop() {

    if (frameCount % 120 == 0) {
        var randX = Math.round(random(100, width - 100))
        crops = createSprite(randX, 0)
        crops.velocityY = 4
        crops.scale = 0.25


        rand = Math.round(random(1, 6))
        switch (rand) {
            case 1: crops.addImage(harvest1)
                break;

            case 2: crops.addImage(harvest2)
                crops.scale = 0.5
                break;

            case 3: crops.addImage(harvest3)
                break;

            case 4: crops.addImage(harvest4)
                break;

            case 5: crops.addImage(harvest5)
                break;

            case 6: crops.addImage(harvest6)
                break;

            default: break;


        }

        cropsGroup.add(crops)

    }
}


// //level 3 won function
function level3Won() {

    swal(
        {

            title: `KUDOS!!!!`,
            text: "You have built your Dream Farm and Hut!!!",
            imageUrl: "assets/girl_water-removebg-preview.png",
            imageSize: "200x200",
            confirmButtonText: "Restart",
            confirmButtonColor: "cyan"
        },
        function () {
            window.location.reload();
        }

    )
}


function GameOver() {
    diesound.play()
    swal(
        {

            title: `You LOOSE`,
            text: "Click on the vegetables to Sell Them",
            imageUrl: "assets/girl_water-removebg-preview.png",
            imageSize: "200x200",
            confirmButtonText: "Restart",
            confirmButtonColor: "cyan"
        },
        function () {
            
            window.location.reload();
        }

    )
}


