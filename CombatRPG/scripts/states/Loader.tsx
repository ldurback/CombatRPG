namespace CombatRPG {
    export class Loader extends Phaser.State {
        create() {
            this.createMenu();
        }

        createMenu() {
            var loaderMenu = (<Menu title="Conversations">
                <div onClick={e => {
                    this.runDemoConversation();
                }}>Demo Conversation</div>
            </Menu>);

            var target = document.getElementById("menu-screen");

            React.render(loaderMenu, target);

            $("#menu-screen").show();
        }

        runDemoConversation() {
            var demoConversation = (<ConversationBox onClose={() => {
                $("#conversations").hide()
            } }>
                <div>This demo has nothing in it yet</div>
                <div>Click done to close</div>
            </ConversationBox>);

            var target = document.getElementById("conversations");

            React.render(demoConversation, target);

            $("#conversations").show();
        }
    }
}