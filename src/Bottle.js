export class Bottle extends Phaser.GameObjects.Sprite 
{
  constructor(scene, x, y, sprite) 
  {
    super(scene, x, y, sprite);
    
    //when this class is accessed it access the current scene and adds the bottle to that scene 
    this.scene = scene;
    scene.add.existing(this);

    //set the bottle interactive
    this.setInteractive();

    //set boolean values for logic use
    this.flipped = false;
    this.touch = false;

    //using phaser matter physics we turn our sprite into a gameobject
    scene.matter.add.gameObject(this);

    //when converted to a gameobject we are able to set its friction
    this.setFriction(0.33, 0.01, 10);
  }

  //this function has multiple conditions and is called to check if the bottle is stationary
  bottle_stationary() 
  {
    this.bottle_angle = Math.abs(this.angle) < 1;
    this.bottle_velocity = Math.abs(this.body.velocity.y) < 2;

    return (this.bottle_angle && this.bottle_velocity);
  }

  //this function is called when our bottle is interactive and draggable by the mouse pointer
  //velocity of the bottle is calculated
  bottle_flip(mouse_pointer) 
  {
    let velocity_y = (this.scene.startDragY - mouse_pointer) / 25;

    this.setVelocity(0, -velocity_y);
    this.setAngularVelocity(velocity_y / 360);

    //lock the velocity at 50 so our bottle stays under a limit
    if (velocity_y > 25){
        velocity_y = 25;
    }
  }
}
