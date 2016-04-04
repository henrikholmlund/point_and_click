var game = new Phaser.Game(1024, 840, Phaser.CANVAS, 'game', { preload: preload, create: create, update: update });


//Laddar in alla assets
/* var backgroundImageCounter = 0;
var backgroundImages = ['assets/monkeybackground2.png', 'assets/stalkersand.jpg']; */

function preload() {
    game.load.image('inventorybackground', 'assets/inventorybackground.png');
    game.load.image('lighthouse', 'assets/monkeybackground2.png');
    game.load.image('sand', 'assets/stalkersand.jpg');
    game.load.image('path', 'assets/path3.png');
    game.load.image('pointObject', 'assets/pointer.png');
    game.load.image('banana', 'assets/banana.png');
    game.load.image('gorilla', 'assets/gorilla.png');
    game.load.image('arrow', 'assets/yellowarrow.png');
    game.load.image('arrowleft', 'assets/yellowarrowleft.png');
    game.load.audio('soundtrack', 'assets/soundtrack.mp3');
    game.load.spritesheet('dude', 'assets/gb_walk_test.png', 107, 171);

}

//Globala variabler

var player;
var pointer;
var inventory;
var banana;
var myBanana;
var bananatext;
var inventoryBanana;
var path1;
var path2;
var gorilla;
var gorillatext;
var arrowright;
var arrowleft;
var arrowText;
var inventoryBackground;
var lighthouse;
var sand;
var gorillaQuestion;
var music;





function create() {


    game.physics.startSystem(Phaser.Physics.ARCADE);


    //Lägger till bakgrundsbild
    inventoryBackground = game.add.sprite(0, 0, 'inventorybackground');
    lighthouse = game.add.sprite(0, 0, 'lighthouse');
    lighthouse.visible = true;
    sand = game.add.sprite(0, 0, 'sand');
    sand.scale.setTo(1, 1);
    sand.visible = false;

    music = game.add.audio('soundtrack');
    //music.loop = true;
    music.play();


    //Path1 är ett osynligt objekt för att tvinga gubben att inte röra sig över hela spelplanen

    path1 = game.add.sprite(0, 0, 'path');

    path1.anchor.set(0.5);
    path1.scale.setTo(2, 2);
    path1.visible = false;
    path1.enableBody = true;
    game.physics.enable(path1, Phaser.Physics.ARCADE);

    path2 = game.add.sprite(0, 730, 'path');

    path2.anchor.set(0.5);
    path2.scale.setTo(2, 1);
    path2.visible = false;
    path2.enableBody = true;
    game.physics.enable(path2, Phaser.Physics.ARCADE);



    //Skapar gubben

    player = game.add.sprite(0, 420, 'dude');

    player.inputEnabled = true;
    player.enableBody = true;



    game.physics.enable(player, Phaser.Physics.ARCADE);
    player.body.collideWorldBounds = true;

    //Animationer för sprite sheet för gubben
    player.animations.add('right', [12, 0, 1, 2, 3, 4, 5], 10, true);
    player.animations.add('left', [13, 6, 7, 8, 9, 10, 11], 10, true);

    //gorilla

    gorilla = game.add.sprite(930, 300, 'gorilla');
    gorilla.scale.setTo(0.25, 0.25);
    gorilla.enableBody = true;
    game.physics.enable(gorilla, Phaser.Physics.ARCADE);
    gorilla.visible = true;
    gorilla.inputEnabled = true;
    gorilla.events.onInputDown.add(listener4, this);

    gorillatext = game.add.text(100, 50, '', { fill: '#ffffff' });

    //Skapar pil för att klicka sig till annan scen

    arrowright = game.add.sprite(930, 300, 'arrow');
    arrowright.scale.setTo(0.15, 0.2);
    arrowright.inputEnabled = true;
    arrowright.visible = false;

    arrowright.events.onInputDown.add(listener2, this);

    arrowleft = game.add.sprite(0, 300, 'arrowleft');
    arrowleft.scale.setTo(0.15, 0.2);
    arrowleft.inputEnabled = true;
    arrowleft.visible= false;

    arrowleft.events.onInputDown.add(listener3, this);

    //Text som ska dyka upp när man klickar på pilen

    arrowText = game.add.text(250, 50, '', { fill: '#ffffff' });

    //En banan man kan ta i sitt inventory

    banana = game.add.sprite(game.world.centerX - 90, game.world.centerY, 'banana');
    banana.inputEnabled = true;
    banana.scale.setTo(0.25, 0.25);
    banana.enableBody = true;
    banana.visible = true;

    //texten till bananen

    bananatext = game.add.text(250, 50, '', { fill: '#ffffff' });

    banana.events.onInputDown.add(listener, this);

    inventoryBanana = game.add.sprite(940, 650, 'banana');
    inventoryBanana.scale.setTo(0.25, 0.25);
    inventoryBanana.visible = false;
    inventoryBanana.enableBody = false;
    inventoryBanana.inputEnabled = false;
    //inventoryBanana.events.onInputDown.add(listener3, this);

    //inventory för gubben

    inventory =

    {

        banana: {
            hasItem: false



        }


    }


}

//switch-Dialog med spelaren om bananen

function listener () {

   myBanana = prompt("This is a pretty nice looking banana, what do you want to do with it? Select 'take' or 'leave' ");
    switch (myBanana.toLowerCase()) {
        case "take":
            bananatext.visible = true;
            bananatext.text = "You take the banana";

            inventory.banana.hasItem = true;

            banana.kill();

            game.time.events.add(Phaser.Timer.SECOND * 5, removeText, this);
            inventoryBanana.visible = true;
            inventoryBanana.enableBody = true;
            inventoryBanana.inputEnabled = true;


        function removeText() {

            bananatext.visible = false;

        }

            break;

        case "leave":
            bananatext.visible = true;
            bananatext.text = "You leave the banana alone";
            game.time.events.add(Phaser.Timer.SECOND * 5, removeText, this);

        function removeText() {

            bananatext.visible = false;

        }

            break;

        default:
            bananatext.visible = true;
            bananatext.text = "The banana doesn't understand. Try again! ";
            game.time.events.add(Phaser.Timer.SECOND * 5, removeText, this);

        function removeText() {

            bananatext.visible = false;

        }

            break;
    }


}

function listener2 () {
    if(player.body.x >= 800) {
        var arrowQuestion;
         arrowQuestion = prompt("Are you sure you want to leave this room? Type 'yes' or 'no' to answer");
        switch (arrowQuestion.toLowerCase()) {
            case "yes":
                arrowText.visible = true;
                arrowText.text = "You leave the room";


                game.time.events.add(Phaser.Timer.SECOND * 5, removeText, this);
                sand.visible = true;
                lighthouse.visible = false;

                player.kill();
                arrowright.visible = false;


                player = game.add.sprite(0, 450, 'dude');


                game.physics.enable(player, Phaser.Physics.ARCADE);
                player.body.collideWorldBounds = true;

                player.animations.add('right', [12, 0, 1, 2, 3, 4, 5], 10, true);
                player.animations.add('left', [13, 6, 7, 8, 9, 10, 11], 10, true);
                banana.kill();
                arrowleft.visible = true;


            function removeText() {

                arrowText.visible = false;

            }

                break;

            case "no":
                arrowText.visible = true;
                arrowText.text = "Let's stay in this room then!";
                game.time.events.add(Phaser.Timer.SECOND * 5, removeText, this);

            function removeText() {

                arrowText.visible = false;

            }

                break;

            default:
                arrowText.visible = true;
                arrowText.text = "The arrow doesn't understand. Try again! ";
                game.time.events.add(Phaser.Timer.SECOND * 5, removeText, this);

            function removeText() {

                arrowText.visible = false;

            }

                break;
        }
    }

}

function listener3 () {


        var arrowleftQuestion = prompt("Are you sure you want to leave this room? Type 'yes' or 'no' to answer");
        switch (arrowleftQuestion.toLowerCase()) {
            case "yes":
                arrowText.visible = true;
                arrowText.text = "You leave the room";


                game.time.events.add(Phaser.Timer.SECOND * 5, removeText, this);
                sand.visible = false;
                lighthouse.visible = true;

                player.kill();

                player = game.add.sprite(800, 450, 'dude');


                game.physics.enable(player, Phaser.Physics.ARCADE);
                player.body.collideWorldBounds = true;

                player.animations.add('right', [12, 0, 1, 2, 3, 4, 5], 10, true);
                player.animations.add('left', [13, 6, 7, 8, 9, 10, 11], 10, true);

                arrowleft.visible = false;
                arrowright.visible = true;


                break;

            case "no":
                arrowText.visible = true;
                arrowText.text = "Let's stay in this room then!";
                game.time.events.add(Phaser.Timer.SECOND * 5, removeText, this);

            function removeText() {

                arrowText.visible = false;

            }

                break;

            default:
                arrowText.visible = true;
                arrowText.text = "The arrow doesn't understand. Try again! ";
                game.time.events.add(Phaser.Timer.SECOND * 5, removeText, this);

            function removeText() {

                arrowText.visible = false;

            }

                break;
        }


}

function listener4 (){
    if(!inventory.banana.hasItem){
       gorillaQuestion = prompt("This is a pretty mean looking gorilla. It doesn't look like he'll let you past with out some kind of reward.");
    }

   else if (inventory.banana.hasItem) {
        gorillaQuestion = prompt("This is a pretty mean looking gorilla. He does look rather hungry though. Do you want to give him your most delicious banana?" +
            "Type 'yes or 'no' ");

        if(gorillaQuestion.toLowerCase() === 'yes') {
                gorillatext.visible = true;
                gorillatext.text = "The gorilla leaves to enjoy his scrumptious banana." +
                    " You are free to go";
            gorilla.kill();
            inventoryBanana.kill();
            arrowright.visible = true;

            game.time.events.add(Phaser.Timer.SECOND * 6, removeText, this);

            function removeText() {

                gorillatext.visible = false;

            }
        } else if (gorillaQuestion.toLowerCase() === 'no') {
            gorillatext.visible = true;
            gorillatext.text = "The gorilla isn't gonna let you past dude. Not without a little something";
            game.time.events.add(Phaser.Timer.SECOND * 6, removeText, this);
            function removeText() {

                gorillatext.visible = false;

            }
        } else {
            gorillatext.visible = true;
            gorillatext.text = "Dang it, nobody understood what you were trying to say or do.";
            game.time.events.add(Phaser.Timer.SECOND * 6, removeText, this);
            function removeText() {

                gorillatext.visible = false;

            }
        }
    }
    }

function update() {


    //kollar om pointer är klickad

    if (game.input.activePointer.isDown)
    {
        if(pointer){
            pointer.kill();
        }

        pointer = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'pointObject');
        pointer.scale.setTo(0.5, 0.5);
        pointer.enableBody = true;
        game.physics.enable(pointer, Phaser.Physics.ARCADE);

    }

    //logiken för att gubben rör sig och stannar när

    if(pointer){

        if(!game.physics.arcade.overlap(player, pointer))
        {
            game.physics.arcade.moveToObject(player, pointer, 170);

            if(player.body.x <= pointer.body.x)
            {
                player.animations.play('right');
            }
            else if(player.body.x >= pointer.body.x)
            {
                player.animations.play('left');
            }
        }

        else
        {
            stopDude();
        }

    }

    //Hindrar att gubben inte kan gå på hela planen.

    if(game.physics.arcade.overlap(pointer, path1)){
        player.body.velocity.y = 0;
    }

    if(game.physics.arcade.overlap(pointer, path2)){
        player.body.velocity.y = 0;
    }

   /*  if(gorilla.visible = true) {
        if(game.physics.arcade.overlap(player, gorilla)){
            stopDude();

        }
    } */

        if(!music.isPlaying){
            music.play('',0, 1);
        }





}

//Stannar gubben och animationerna

function stopDude() {

    player.body.velocity.x = 0;
    player.body.velocity.y = 0;
    player.animations.stop();
    player.frame = 12;
}






