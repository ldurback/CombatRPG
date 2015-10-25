///<reference path="../../lib/phaser.d.ts" />
///<reference path="../../Game.ts" />

namespace CombatRPG {
    export namespace States {
        export namespace Maps {
            export abstract class Map extends Phaser.State {
                preloadBar: Phaser.Sprite;

                preload() {
 
                    //  Set-up our preloader sprite
                    this.preloadBar = this.add.sprite(200, 250, 'preloadBar');
                    this.load.setPreloadSprite(this.preloadBar);

                    this.loadAssets();
                }

                abstract loadAssets();

                create() {
                    this.game.inBattle = false;
                    this.game.return.state = this.name();
                    this.preloadBar.kill();
                    this.game.physics.arcade.gravity.y = 0;
                    this.createScene();
                }

                abstract createScene();

                update() {
                    // send to status screen on pressing escape
                    if (this.game.input.keyboard.isDown(Phaser.Keyboard.ESC)) {
                        this.game.statusMenu.showMenu();
                    }

                    this.mapSpecificUpdate();
                }

                abstract mapSpecificUpdate();

                name(): string {
                    var funcNameRegex = /function (.{1,})\(/;
                    var results = (funcNameRegex).exec((this).constructor.toString());
                    return (results && results.length > 1) ? results[1] : "";
                }
            }
        }
    }
}