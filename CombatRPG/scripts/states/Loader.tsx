namespace CombatRPG {
    export class Loader extends Phaser.State {
        create() {
            this.createMenu();
        }

        createMenu() {
            var loaderMenu = (<Menu title="Conversations">
                <div onClick={e => {
                    $("#menu-screen").hide();
                    this.runDemoConversation();
                }}>Demo Conversation</div>
                </Menu>);

            var target = document.getElementById("menu-screen");

            React.render(loaderMenu, target);

            $("#menu-screen").show();
        }

        runDemoConversation() {
            var demoConversation = (<ConversationBox onClose={() => {
                $("#menu-screen").show();
                $("#msg-screen").hide();
            } }>
                    <Message text="This demo has nothing in it yet" />
                    <Message text="Click done to close" />
                </ConversationBox>);

            var target = document.getElementById("msg-screen");

            React.render(demoConversation, target);

            $("#msg-screen").show();
        }
    }
}