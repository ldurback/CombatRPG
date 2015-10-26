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

                    this.game.player.battleEntity = this.player;

                    this.hpGauge = this.add.text(0, 0, "HP: ", { fill: "#ffffff" });
                    this.menuUp = false;

                    this.game.inBattle = true;
                }

                abstract createScene();

                update() {
                    this.runCollisions(); 

                    if (!this.player.alive) {
                        this.game.state.start('GameOver', true, false);
                    }

                    if (this.enemies.getFirstAlive() == null) {
                        this.game.state.start('BattleWin', true, false);
                    }
                }

                runCollisions() {
                    this.physics.arcade.collide(this.player, this.platforms);
                    this.physics.arcade.collide(this.enemies, this.platforms);

                    this.physics.arcade.collide(this.player, this.enemies, (player: Entities.Battle.Player, enemy: Entities.Battle.Entity) => {
                        this.hurtEntityByAttacker(enemy, player);
                    });

                    this.physics.arcade.overlap(this.player, this.enemyBullets, (player: Entities.Battle.Player, bullet: Entities.Battle.Entity) => {
                        this.hurtEntityByAttacker(bullet, player);
                    });

                    this.physics.arcade.overlap(this.player.equippedWeapon, this.enemies, (playerWeapon: Entities.Battle.Weapon, enemy: Entities.Battle.Entity) => {
                        this.hurtEntityByAttacker(playerWeapon.wielder, enemy);
                    });
                }

                hurtEntityByAttacker(attacker: Entities.Battle.Entity, defender: Entities.Battle.Entity) {
                    if (!defender.invincible && !attacker.invincible) {
                        defender.status.currentHP -= attacker.status.strength / defender.status.defense;
                        defender.invincible = true;

                        var invincibleTimer: Phaser.Timer = this.game.time.create(true);
                        invincibleTimer.add(1000, () => {
                            defender.invincible = false;
                        });
                        invincibleTimer.start();
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