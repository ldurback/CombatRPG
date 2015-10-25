///<reference path="../../lib/phaser.d.ts" />
///<reference path="../../entities/battle/Player.ts" />
///<reference path="../../entities/battle/Entity.ts" />
///<reference path="../../entities/battle/Weapon.ts" />

namespace CombatRPG {
    export namespace States {
        export namespace Battles {
            export abstract class Battle extends Phaser.State {
                preloadBar: Phaser.Sprite;

                player: Entities.Battle.Player;
                platforms: Phaser.Group;
                enemies: Phaser.Group;
                enemyBullets: Phaser.Group;

                hpGauge: Phaser.Text;

                battleMenu: Phaser.Group;

                menuUp: boolean;

                preload() {
                    //  Set-up our preloader sprite
                    this.preloadBar = this.add.sprite(200, 250, 'preloadBar');
                    this.load.setPreloadSprite(this.preloadBar);

                    this.game.state.add("BattleWin", BattleWin);
                    this.game.state.add("GameOver", GameOver);

                    this.loadAssets();
                }

                abstract loadAssets();

                create() {
                    this.preloadBar.kill();

                    this.game.input.keyboard.addKey(Phaser.Keyboard.ESC).onDown.add(this.showStatusMenu, this);

                    this.createScene();

                    this.hpGauge = this.add.text(0, 0, "HP: ", { fill: "#ffffff" });
                    this.menuUp = false;
                }

                abstract createScene();

                update() {
                    this.physics.arcade.collide(this.player, this.platforms);
                    this.physics.arcade.collide(this.enemies, this.platforms);

                    this.physics.arcade.overlap(this.player, this.enemies, (player: Entities.Battle.Player, enemy: Entities.Battle.Entity) => {
                        if (!player.invincible && !enemy.invincible) {
                            player.status.currentHP -= enemy.status.strength / player.status.defense;
                            player.invincible = true;

                            var invincibleTimer: Phaser.Timer = this.game.time.create(true);
                            invincibleTimer.add(1000, () => {
                                player.invincible = false;
                            });
                            invincibleTimer.start();
                        }
                    });

                    this.physics.arcade.overlap(this.player, this.enemyBullets, (player: Entities.Battle.Player, bullet: Entities.Battle.Entity) => {
                        if (!player.invincible) {
                            player.status.currentHP -= bullet.status.strength / player.status.defense;
                            player.invincible = true;

                            var invincibleTimer: Phaser.Timer = this.game.time.create(true);
                            invincibleTimer.add(1000, () => {
                                player.invincible = false;
                            });
                            invincibleTimer.start();
                        }
                    });

                    this.physics.arcade.overlap(this.player.equippedWeapon, this.enemies, (playerWeapon: Entities.Battle.Weapon, enemy: Entities.Battle.Entity) => {
                        if (!enemy.invincible) {
                            enemy.status.currentHP -= playerWeapon.wielder.status.strength / enemy.status.defense;

                            enemy.invincible = true;

                            var invincibleTimer: Phaser.Timer = this.game.time.create(true);
                            invincibleTimer.add(1000, () => {
                                enemy.invincible = false;
                            });
                            invincibleTimer.start();
                        }
                    });

                    this.physics.arcade.collide(this.player, this.enemies);

                    if (!this.player.alive) {
                        this.game.state.start('GameOver', true, false);
                    }

                    if (this.enemies.getFirstAlive() == null) {
                        this.game.state.start('BattleWin', true, false);
                    }
                }

                render() {
                    this.hpGauge.text = "HP: " + this.player.status.currentHP + "/" + this.player.status.maxHP;
                }

                showStatusMenu() {
                    this.game.statusMenu.showMenu();
                }
            }
        }
    }
}