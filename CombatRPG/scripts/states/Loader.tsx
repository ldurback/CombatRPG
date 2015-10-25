namespace CombatRPG {
    export class Loader extends Phaser.State {
        create() {
            this.createMenu();
        }

        createMenu() {
            var loaderMenu = (<div>
                <b>Dev Menu</b>
                <Menu title="Conversations">
                    <ul>
                    <li><div onClick={e => {
                        this.runDemoConversation();
                    } }>Demo Conversation</div></li>
                    <li><div onClick={e => {
                        this.runSlimeConversation();
                    } }>Slime Conversation</div></li>
                    </ul>
                </Menu>
                <Menu title="Battles">
                    <ul><li>no battles yet</li></ul>
                </Menu>
                <Menu title="Maps">
                    <ul><li>no maps yet</li></ul>
                </Menu>
            </div>);

            var target = document.getElementById("menu-screen");

            React.render(loaderMenu, target);

            $("#menu-screen").show();
        }

        runDemoConversation() {
            var demoConversation = (<ConversationBox key="demoConvo" onClose={() => {
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

        runSlimeConversation() {
            var slimeConversation = (<ConversationBox key="slimeConvo" onClose={() => {
                $("#conversations").hide()
            } }>
                <Message imageURL="assets/images/slime.png" name="Slime">I'm a slime!</Message>
            </ConversationBox>);

            var target = document.getElementById("conversations");

            React.render(slimeConversation, target);

            $("#conversations").show();
        }
    }
}