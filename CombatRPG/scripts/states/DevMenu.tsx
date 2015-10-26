///<reference path="../lib/phaser.d.ts" />

///<reference path="../ReactComponents/Menu.tsx" />
///<reference path="../ReactComponents/ConversationBox.tsx" />
///<reference path="../ReactComponents/Message.tsx" />

///<reference path="maps/BasicMap.ts" />
///<reference path="battles/SlimeBattle.ts" />
///<reference path="shops/PotionShop.tsx" />

namespace CombatRPG {
    export namespace States {
        export class DevMenu extends Phaser.State {
            create() {
                this.game.return.state = "DevMenu";
                this.game.inBattle = false;

                this.game.state.add("BasicMap", States.Maps.BasicMap);
                this.game.state.add("SlimeBattle", States.Battles.SlimeBattle);
                this.game.state.add("BowOrcBattle", States.Battles.BowOrcBattle);
                this.game.state.add("PotionShop", States.Shops.PotionShop);

                this.createMenu();
            }

            createMenu() {
                var devMenuText = (<div>
                    <b>Dev Menu</b>
                    <div className="link menu-link" onClick={e => this.openStatusMenu() }>
                        Status Menu
                    </div>
                    <ReactComponents.Menu titleClassName="link menu-link" title="Conversations">
                        <ul>
                        <li><div className="link menu-link" onClick={e => {
                            this.runDemoConversation();
                        } }>Demo Conversation</div></li>
                        <li><div className="link menu-link" onClick={e => {
                            this.runSlimeConversation();
                        } }>Slime Conversation</div></li>
                        </ul>
                    </ReactComponents.Menu>
                    <ReactComponents.Menu titleClassName="link menu-link" title="Battles">
                        <ul><li><div className="link menu-link" onClick={e => {
                            $("#dev-menu-screen").hide();
                            this.game.state.start("SlimeBattle");
                        } }>Slime Battle</div></li>

                            <li><div className="link menu-link" onClick={e => {
                                $("#dev-menu-screen").hide();
                                this.game.state.start("BowOrcBattle");
                            } }>BowOrc Battle</div></li></ul>
                    </ReactComponents.Menu>
                    <ReactComponents.Menu titleClassName="link menu-link" title="Maps">
                        <ul><li><div className="link menu-link" onClick={e => {
                            $("#dev-menu-screen").hide();

                            this.game.return.position = { x: 400, y: 400 };
                            this.game.state.start("BasicMap");
                        } }>Basic Map</div></li></ul>
                    </ReactComponents.Menu>
                    <ReactComponents.Menu titleClassName="link menu-link" title="Shops">
                        <ul><li><div className="link menu-link" onClick={e => {
                            $("#dev-menu-screen").hide();
                            this.game.state.start("PotionShop");
                        } }>Potion Shops</div></li></ul>
                    </ReactComponents.Menu>
                </div>);

                var target = document.getElementById("dev-menu-screen");

                React.render(devMenuText, target);

                $("#dev-menu-screen").show();
            }

            openStatusMenu() {
                this.game.statusMenu.showMenu();
            }

            runDemoConversation() {
                var demoConversation = (<ReactComponents.ConversationBox key="demoConvo" onClose={() => {
                    $("#conversations").hide()
                } }>
                    <div>This demo has nothing in it yet except for some text.
                        Click on the conversation box to continue.</div>
                    <div>Click to close.</div>
                </ReactComponents.ConversationBox>);

                var target = document.getElementById("conversations");

                React.render(demoConversation, target);

                $("#conversations").show();
            }

            runSlimeConversation() {
                var slimeConversation = (<ReactComponents.ConversationBox key="slimeConvo" onClose={() => {
                    $("#conversations").hide()
                } }>
                    <ReactComponents.Message imageURL="assets/images/slime.png" name="Slime">I'm a slime!</ReactComponents.Message>
                </ReactComponents.ConversationBox>);

                var target = document.getElementById("conversations");

                React.render(slimeConversation, target);

                $("#conversations").show();
            }
        }
    }
}