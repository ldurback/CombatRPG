namespace CombatRPG {
    export class BattleLoader extends Phaser.State {
        create() {
            var demoMessages = (<ConversationBox onClose={() => { $("#msg-screen").hide() }}>
                    <Message text="This demo has nothing in it yet" />
                    <Message text="Click done to close" />
                </ConversationBox>);

            var target = document.getElementById("msg-screen");

            React.render(demoMessages, target);

            $("#msg-screen").show();
        }
    }
}