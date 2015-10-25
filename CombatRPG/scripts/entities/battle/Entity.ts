///<reference path="../../lib/phaser.d.ts" />

namespace CombatRPG {
    export namespace Entities {
        export namespace Battle {
            export abstract class Entity extends Phaser.Sprite {
                status: Status;
                invincible: boolean;

                constructor(game: Phaser.Game, x: number, y: number, key?: string | Phaser.RenderTexture | Phaser.BitmapData | PIXI.Texture, frame?: string | number) {
                    super(game, x, y, key, frame);

                    game.add.existing(this);

                    this.invincible = false;
                }

                update() {
                    if (this.invincible) {
                        this.renderable = !this.renderable;
                    }
                    else {
                        this.renderable = true;
                    }

                    if (this.status.currentHP <= 0) {
                        this.kill();
                    }

                    this.doMotion();
                }

                abstract doMotion();
            }
        }
    }
}