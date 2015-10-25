namespace CombatRPG {
    export namespace Entities {
        export namespace Battle {
            export namespace Enemies {
                export class Bullet extends Entity {
                    constructor(game: Phaser.Game, x: number, y: number, xVelocity: number, yVelocity: number) {
                        super(game, x, y, 'bullet');

                        this.status = {
                            maxHP: 4,
                            currentHP: 4,
                            strength: 1,
                            defense: 1
                        };

                        this.anchor.setTo(0.5, 0.5);
                        game.physics.arcade.enable(this);
                        this.body.setSize(8, 8);

                        this.body.allowGravity = false;

                        this.body.velocity.x = xVelocity;
                        this.body.velocity.y = yVelocity;

                        this.outOfBoundsKill = true;
                    }

                    doMotion() { }
                }
            }
        }
    }
}