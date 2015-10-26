///<reference path="../../../lib/phaser.d.ts" />

namespace CombatRPG {
    export namespace Entities {
        export namespace Battle {
            export namespace Enemies {
                export class Slime extends Entity {
                    facing: string;

                    constructor(game: Phaser.Game, x: number, y: number) {
                        super(game, x, y, 'slime', 0);

                        this.status = {
                            maxHP: 4,
                            currentHP: 4,
                            strength: 1,
                            defense: 1
                        };

                        this.anchor.setTo(0.5, 0);

                        game.physics.arcade.enable(this);

                        this.body.collideWorldBounds = true;
                        this.body.setSize(40, 22);

                        this.facing = 'left';

                        this.events.onKilled.addOnce(() => {
                            this.giveLoot();
                        });
                    }

                    giveLoot() {
                        this.game.loot.gold += 1;
                        if (Math.random() < 0.25) {
                            if (!this.game.loot.items.has('Potion')) {
                                this.game.loot.items.set('Potion', 0);
                            }
                            this.game.loot.items.set('Potion', this.game.loot.items.get('Potion') + 1);
                        }
                    }

                    doMotion() {
                        var standing = this.body.blocked.down || this.body.touching.down;

                        if (!standing) {
                            if (this.facing == 'left') {
                                this.facing = 'right';
                            }
                            else {
                                this.facing = 'left';
                            }
                        }

                        if (this.facing == 'left') {
                            this.body.velocity.x = -200;
                            this.scale.x = 1;
                        }
                        if (this.facing == 'right') {
                            this.body.velocity.x = 200;
                            this.scale.x = -1;
                        }
                    }
                }
            }
        }
    }
}