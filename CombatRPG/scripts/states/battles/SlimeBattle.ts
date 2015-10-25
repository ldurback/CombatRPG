///<reference path="../../lib/phaser.d.ts" />
///<reference path="Battle.ts" />
///<reference path="../../entities/battle/enemies/slime.ts" />

namespace CombatRPG {
    export namespace States {
        export namespace Battles {
            export class SlimeBattle extends Battle {
                loadAssets() { 
                    //  Load our actual games assets
                    this.load.spritesheet('character', 'assets/images/character.png', 64, 64);
                    this.load.image('slime', 'assets/images/slime.png');
                    this.load.image('platform', 'assets/images/platform.png');
                    //this.load.image('background', 'assets/images/background.png');
                }

                createScene() {
                    //this.add.sprite(0, 0, 'background');

                    this.platforms = this.add.physicsGroup(Phaser.Physics.ARCADE);

                    this.platforms.create(200, 420, 'platform');
                    this.platforms.create(300, 520, 'platform');

                    this.platforms.setAll('body.allowGravity', false);
                    this.platforms.setAll('body.immovable', true);

                    this.player = new Entities.Battle.Player(this.game, 130, 480);

                    this.enemies = this.add.physicsGroup(Phaser.Physics.ARCADE);
                    this.enemies.add(new Entities.Battle.Enemies.Slime(this.game, 400, 380));
                    this.enemies.add(new Entities.Battle.Enemies.Slime(this.game, 250, 242));

                    this.game.physics.arcade.gravity.y = 800;
                }
            }
        }
    }
}