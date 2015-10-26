///<reference path="../../lib/phaser.d.ts" />

namespace CombatRPG {
    export namespace Entities {
        export namespace Map {
            export class Girl extends Phaser.Sprite {
                facing: string;
                constructor(game: Phaser.Game, x: number, y: number) {
                    super(game, x, y, 'girl', 130);

                    this.anchor.setTo(0.5, 0);

                    game.physics.arcade.enable(this);

                    this.body.collideWorldBounds = true;
                    this.body.setSize(32, 48, 0, 12);

                    this.body.immovable = true;
                    this.body.moves = false;

                    game.add.existing(this);
                }
            }
        }
    }
}