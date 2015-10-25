///<reference path="../ReactComponents/Menu.tsx" />
///<reference path="../ReactComponents/ConversationBox.tsx" />
///<reference path="../ReactComponents/Message.tsx" />

namespace CombatRPG {
    export namespace States {
        export class DevMenu extends Phaser.State {
            create() {
                this.game.return.state = "DevMenu";

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
                        no battles yet
                    </ReactComponents.Menu>
                    <ReactComponents.Menu titleClassName="link menu-link" title="Maps">
                        no maps yet
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