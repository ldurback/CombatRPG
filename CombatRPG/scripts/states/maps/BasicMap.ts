///<reference path="../../lib/phaser.d.ts" />
///<reference path="Map.ts" />
///<reference path="../../entities/map/Player.ts" />
///<reference path="../battles/SlimeBattle.ts" />
///<reference path="../battles/BowOrcBattle.ts" />

namespace CombatRPG {
    export namespace States {
        export namespace Maps {
            export class BasicMap extends Map {
                player: Entities.Map.Player;

                battleTimer: Phaser.Timer;

                loadAssets() {
                    this.load.spritesheet('character', 'assets/images/character.png', 64, 64);

                    this.game.state.add("SlimeBattle", States.Battles.SlimeBattle);
                    this.game.state.add("BowOrcBattle", States.Battles.BowOrcBattle);
                }

                createScene() {
                    this.player = new Entities.Map.Player(this.game, this.game.return.position.x, this.game.return.position.y);

                    this.battleTimer = this.game.time.create(true);
                    this.battleTimer.add(Math.random() * 9000 + 1000, () => {
                        this.game.return.position = {
                            x: this.player.x,
                            y: this.player.y
                        };

                        if (Math.random() <= 0.5) {
                            this.game.state.start('SlimeBattle', true, false);
                        }
                        else {
                            this.game.state.start('BowOrcBattle', true, false);
                        }
                    });
                    this.battleTimer.start();
                }

                mapSpecificUpdate() {
                    if (this.player.body.velocity.x != 0 || this.player.body.velocity.y != 0) {
                        this.battleTimer.resume();
                    }
                    else {
                        this.battleTimer.pause();
                    }
                }
            }
        }
    }
}