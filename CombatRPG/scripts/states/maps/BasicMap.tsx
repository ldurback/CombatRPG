///<reference path="../../lib/phaser.d.ts" />
///<reference path="Map.ts" />
///<reference path="../../entities/map/Player.ts" />
///<reference path="../battles/SlimeBattle.ts" />
///<reference path="../battles/BowOrcBattle.ts" />

///<reference path="../../entities/map/Girl.ts" />
///<reference path="../../entities/map/InvisibleBox.ts" />

namespace CombatRPG {
    export namespace States {
        export namespace Maps {
            export class BasicMap extends Map {
                player: Entities.Map.Player;
                shopkeeper: Entities.Map.Girl;
                shopkeeperBounds: Entities.Map.InvisibleBox;

                battleTimer: Phaser.Timer;

                loadAssets() {
                    this.load.spritesheet('character', 'assets/images/character.png', 64, 64);
                    this.load.spritesheet('girl', 'assets/images/girl.png', 64, 64);

                    this.game.state.add("SlimeBattle", States.Battles.SlimeBattle);
                    this.game.state.add("BowOrcBattle", States.Battles.BowOrcBattle);
                }

                createScene() {
                    this.shopkeeper = new Entities.Map.Girl(this.game, 400, 100);
                    this.shopkeeperBounds = new Entities.Map.InvisibleBox(this.game, 400, 100, this.shopkeeper.body.width + 20, this.shopkeeper.body.height + 20);
                    this.player = new Entities.Map.Player(this.game, this.game.return.position.x, this.game.return.position.y);

                    this.setupBattleTimer();
                }

                mapSpecificUpdate() {
                    if (this.player.body.velocity.x != 0 || this.player.body.velocity.y != 0) {
                        this.battleTimer.resume();
                    }
                    else {
                        this.battleTimer.pause();
                    }

                    this.collisions();
                }

                setupBattleTimer() {
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

                collisions() {
                    this.physics.arcade.overlap(this.player, this.shopkeeperBounds, () => {
                        if (this.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
                            this.runShopConversation();
                        }
                    });

                    this.physics.arcade.collide(this.player, this.shopkeeper);
                }

                runShopConversation() {
                    var conversation = (<ReactComponents.ConversationBox key="shopkeepConvo" onClose= {() => {
                        $("#conversations").hide()

                        this.game.return.position = {
                            x: this.player.x,
                            y: this.player.y
                        };

                        this.game.state.start("PotionShop");
                    }}>
                        <ReactComponents.Message name= "Girl">Hello!  Won't you buy something?</ReactComponents.Message>
                        </ReactComponents.ConversationBox>);

                    var target = document.getElementById("conversations");

                    React.render(conversation, target);

                    $("#conversations").show();
                }
            }
        }
    }
}