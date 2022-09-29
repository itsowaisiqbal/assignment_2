import { Bottle } from "./Bottle";

let score = 0;

//set highscore to 0 if the user plays the game for the very first time or else store their previous value
let high_score = Number(localStorage.getItem("high_score")) || 0;

export class MainScene extends Phaser.Scene{
    constructor(){

        super("MainScene")
    }

    preload(){

        //preloading the textures into our game
        this.load.image("background", "./assets/bg_tex.png");
        this.load.image("bottle", "./assets/bottle_tex.png");
        this.load.image("ground", "./assets/ground_tex.png");
    }

    create(){

        //getting width and height of our current scene to be dynamically used later
        this.width = this.game.config.width;
        this.height = this.game.config.height;

        //creating assets and adding it to our scene
        this.add_background();
        this.add_ground();
        this.add_bottle();
        this.game_score();
    }
    
    //update function is called 60 times per second
    update(){

        //getting mouse pointer data from user to apply drag force to the bottle
        this.input.on("dragstart", (mouse_pointer) => (this.startDragY = mouse_pointer.y));
        this.input.on("dragend", (mouse_pointer) => {this.bottle.bottle_flip(mouse_pointer.y); this.bottle.touch = true;});

        //check if the bottle has flipped when dragged
        if (Math.abs(this.bottle.angle) > 90) {
            this.bottle.flipped = true;
        }

        //check if bottle is flipped and lands straight
        if (this.bottle.touch && this.bottle.bottle_stationary() && this.bottle.body.velocity.y < 1) 
        {
            //bottle is flipped properly then add to score
            if (this.bottle.flipped){

                score++;
            }

            //score is greater than higher score
            if (score > high_score){

                high_score = score;
                localStorage.setItem("high_score", high_score);
            }

            //restarts scene once the bottle is landed properly
            this.scene.restart();
        }

        //checks if the bottle is flipped but does not land straight
        else if(this.bottle.touch && !this.bottle.bottle_stationary() && this.bottle.body.velocity.y == 0){

            //restarts scene once the bottle is landed properly
            this.scene.restart();
        }
    }

    add_background(){

        this.add.image(0, 0, "background").setOrigin(0, 0).setDisplaySize(this.width, this.height);
    }

    add_ground(){

        this.floor = this.add.image(0, this.height + 75, "ground").setOrigin(0, 1).setDisplaySize(this.width * 1.25, this.height / 1.75);

        //adds a rectangle box which acts as a collider for the bottle
        this.floorBody = this.matter.add.rectangle(this.width / 2, this.height + 300, this.floor.displayWidth, this.floor.displayHeight, { isStatic: true });
    }

    add_bottle(){

        this.bottle = new Bottle(this, this.width / 2, this.height - 250, "bottle");

        //converts the bottle gameobject into draggable so that our mouse pointer is able to access it. Check update function
        this.input.setDraggable(this.bottle);
    }

    game_score(){
        
        //adds score to the scene
        this.scoreText = this.add.text(this.width / 2 - 25, this.height / 2 - 500, score, {fontFamily: 'Arial', fontSize: "100px", fontStyle: "bold"});

        //adds high score to the scene
        this.scoreText = this.add.text(0, 0, "High Score: " + high_score, {fontFamily: 'Arial', fontSize: "50px", fontStyle: "bold"});
    }
}