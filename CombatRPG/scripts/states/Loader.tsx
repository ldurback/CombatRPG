namespace CombatRPG {
    export class Loader extends Phaser.State {
        create() {
            this.createMenu();
        }

        createMenu() {
            var loaderMenu = (<div><b>Dev Menu</b>
                <Menu title="Conversations">
                    <div onClick={e => {
                        this.runDemoConversation();
                    }}>Demo Conversation</div>
                </Menu>
                <Menu title="Battles">
                    no battles yet
                </Menu>
                <Menu title="Maps">
                    no maps yet
                </Menu>
            </div>);

            var target = document.getElementById("menu-screen");

            React.render(loaderMenu, target);

            $("#menu-screen").show();
        }

        runDemoConversation() {
            var demoConversation = (<ConversationBox onClose={() => {
                $("#conversations").hide()
            } }>
                <div>This demo has nothing in it yet except for some text.
                    Click on the conversation box to continue.</div>
                <div>Click to close.</div>
            </ConversationBox>);

            var target = document.getElementById("conversations");

            React.render(demoConversation, target);

            $("#conversations").show();
        }
    }
}