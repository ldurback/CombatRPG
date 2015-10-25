///<reference path="../../entities/battle/Player.ts" />
///<reference path="../../entities/battle/enemies/BowOrc.ts" />

namespace CombatRPG {
    export namespace States {
        export namespace Battles {
            export class BowOrcBattle extends Battle {
                loadAssets() { 
                    //  Load our actual games assets
                    this.load.spritesheet('character', 'assets/images/character.png', 64, 64);
                    this.load.spritesheet('bow-orc', 'assets/images/bow-orc.png', 64, 64);
                    this.load.image('bullet', 'assets/images/bullet.png');
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

                    this.enemyBullets = this.add.physicsGroup(Phaser.Physics.ARCADE);

                    this.enemies = this.add.physicsGroup(Phaser.Physics.ARCADE);
                    this.enemies.add(new Entities.Battle.Enemies.BowOrc(this.game, 400, 300, this.enemyBullets, this.player));
                    this.enemies.add(new Entities.Battle.Enemies.BowOrc(this.game, 250, 200, this.enemyBullets, this.player));

                    this.game.physics.arcade.gravity.y = 800;
                }
            }
        }
    }
}