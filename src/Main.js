import { MainScene } from "./MainScene";

const config = 
{
    //using the matter physics engine in phaser
    //i used this specifically as it seemed the closest to the physics system i use in Unity and helped me get my head around it
    //https://photonstorm.github.io/phaser3-docs/Phaser.Physics.Matter.MatterPhysics.html
    physics: {

        default: "matter",
        matter: {
            
            gravity: { y: 5 }, debug: false,
        },
    },

    scale: {

        width: 800,
        height: 1600,

        //using the phaser ScaleManager class to fit and center the game on the browser
        //https://photonstorm.github.io/phaser3-docs/Phaser.Scale.ScaleManager.html
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    scene: [MainScene]
};

const game = new Phaser.Game(config);