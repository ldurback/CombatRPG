///<reference path="Bullet.ts" />
///<reference path="../Player.ts" />

namespace CombatRPG {
    export namespace Entities {
        export namespace Battle {
            export namespace Enemies {
                export class BowOrc extends Entity {
                    facing: string;
                    bulletGroup: Phaser.Group;
                    player: Player;

                    shooting: boolean;

                    constructor(game: Phaser.Game, x: number, y: number, bulletGroup: Phaser.Group, player: Player) {
                        super(game, x, y, 'bow-orc', 208);

                        this.animations.add('shootLeft', [221, 222, 223, 224, 225, 226, 227, 228, 229, 230, 231, 232, 233], 8, false);
                        this.animations.add('shootRight', [247, 248, 249, 250, 251, 252, 253, 254, 255, 256, 257, 258, 259], 8, false);

                        this.bulletGroup = bulletGroup;
                        this.player = player;

                        this.shooting = false;

                        this.status = {
                            maxHP: 4,
                            currentHP: 4,
                            strength: 1,
                            defense: 1
                        };

                        this.anchor.setTo(0.5, 0);

                        game.physics.arcade.enable(this);

                        this.body.collideWorldBounds = true;
                        this.body.setSize(32, 48, 0, 12);

                        this.facing = 'left';

                        this.events.onKilled.addOnce(() => {
                            this.giveLoot();
                        });
                    }

                    giveLoot() {
                        this.game.loot.gold += 2;
                        if (Math.random() < 0.5) {
                            if (!this.game.loot.items.has('Potion')) {
                                this.game.loot.items.set('Potion', 0);
                            }

                            this.game.loot.items.set('Potion', this.game.loot.items.get('Potion') + 1);
                        }
                    }

                    doMotion() {
                        this.body.velocity.x = 0;

                        if (this.x >= this.player.x) {
                            this.facing = 'left';
                        }
                        else {
                            this.facing = 'right';
                        }

                        // if not shooting and not stunned, shoot!
                        if (!this.shooting && !this.invincible) {
                            if (this.facing == 'left') {
                                this.shooting = true;
                                this.play('shootLeft').onComplete.addOnce(() => {
                                    this.bulletGroup.add(new Bullet(this.game, this.x, this.y + this.height / 2, -200, 0));
                                    this.shooting = false;
                                });
                            }

                            if (this.facing == 'right') {
                                this.shooting = true;
                                this.play('shootRight').onComplete.addOnce(() => {
                                    this.bulletGroup.add(new Bullet(this.game, this.x, this.y + this.height / 2, 200, 0));
                                    this.shooting = false;
                                });
                            }
                        }
                    }
                }
            }
        }
    }
}