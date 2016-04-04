var game = new Phaser.Game(1024, 640, Phaser.AUTO, '', { preload: preload, create: create, update: update });

//Laddar in alla assets
/* var backgroundImageCounter = 0;
 var backgroundImages = ['assets/monkeybackground2.png', 'assets/stalkersand.jpg']; */

function preload() {
    game.load.image('sky', 'assets/stalkersand.jpg');
    game.load.image('path', 'assets/path3.png');
    game.load.image('pointObject', 'assets/pointer.png');
    game.load.image('banana', 'assets/banana.png');
    game.load.image('arrow', 'assets/yellowarrow.png');
    game.load.spritesheet('dude', 'assets/gb_walk_test.png', 107, 171);

}

//Globala variabler

var player;
var pointer;
var inventory;
var banana;
var bananatext;
var myBanana;
var path1;
var arrowright;
var arrowText;



function create() {


    game.physics.startSystem(Phaser.Physics.ARCADE);


    //Lägger till bakgrundsbild
    game.add.sprite(0, 0, 'sky');

    //Path1 är ett osynligt objekt för att tvinga gubben att inte röra sig över hela spelplanen

    path1 = game.add.sprite(0, 0, 'path');
    path1.anchor.set(0.5);
    path1.scale.setTo(2, 2);
    path1.visible = false;
    path1.enableBody = true;
    game.physics.enable(path1, Phaser.Physics.ARCADE);



    //Skapar gubben

    player = game.add.sprite(0, 450, 'dude');

    player.inputEnabled = true;
    player.enableBody = true;



    game.physics.enable(player, Phaser.Physics.ARCADE);
    player.body.collideWorldBounds = true;

    //Animationer för sprite sheet för gubben
    player.animations.add('right', [12, 0, 1, 2, 3, 4, 5], 10, true);
    player.animations.add('left', [13, 6, 7, 8, 9, 10, 11], 10, true);

    //Skapar pil för att klicka sig till annan scen

    arrowright = game.add.sprite(930, 300, 'arrow');
    arrowright.scale.setTo(0.15, 0.2);
    arrowright.inputEnabled = true;

    arrowright.events.onInputDown.add(listener2, this);

    //Text som ska dyka upp när man klickar på pilen

    arrowText = game.add.text(250, 16, '', { fill: '#ffffff' });

    //En banan man kan ta i sitt inventory

    banana = game.add.sprite(game.world.centerX, game.world.centerY, 'banana');
    banana.inputEnabled = true;
    banana.scale.setTo(0.25, 0.25);
    banana.enableBody = true;

    //texten till bananen

    bananatext = game.add.text(250, 16, '', { fill: '#ffffff' });

    banana.events.onInputDown.add(listener, this);

    //inventory för gubben

    inventory =

    {

        banana: false
        //items: []

    }




}

//switch-Dialog med spelaren om bananen

function listener () {



    myBanana = prompt("This is a banana, what to you want to do with it? Select 'take' or 'leave' ");
    switch (myBanana) {
        case "take":
            bananatext.visible = true;
            bananatext.text = "You take the banana";

            inventory.banana = true;
            //inventory.items.push('banana');
            banana.kill();

            game.time.events.add(Phaser.Timer.SECOND * 5, removeText, this);

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

        arrowright = prompt("Are you sure you want to leave this room? Type 'yes' or 'no' to answer");
        switch (arrowright) {
            case "yes":
                arrowText.visible = true;
                arrowText.text = "You leave the room";

                game.time.events.add(Phaser.Timer.SECOND * 5, removeText, this);




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
            game.physics.arcade.moveToObject(player, pointer, 150);

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




}

//Stannar gubben och animationerna

function stopDude() {

    player.body.velocity.x = 0;
    player.body.velocity.y = 0;
    player.animations.stop();
    player.frame = 12;
}