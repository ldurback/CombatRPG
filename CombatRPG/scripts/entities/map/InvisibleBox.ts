///<reference path="../../lib/phaser.d.ts" />

namespace CombatRPG {
    export namespace Entities {
        export namespace Map {
            export class InvisibleBox extends Phaser.Sprite {
                facing: string;
                constructor(game: Phaser.Game, x: number, y: number, sizeX: number, sizeY: number) {
                    super(game, x, y);

                    this.anchor.setTo(0.5, 0);

                    game.physics.arcade.enable(this);

                    this.body.collideWorldBounds = true;
                    this.body.setSize(sizeX, sizeY);

                    this.body.immovable = true;
                    this.body.moves = false;

                    game.add.existing(this);
                }
            }
        }
    }
}