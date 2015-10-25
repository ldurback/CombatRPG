namespace CombatRPG {
    export namespace States {
        export class SplashScreen extends Phaser.State {
            create() {
                $('#splash-screen').show();

                $('#splash-screen').on("click", (e: Event) => {
                    $('#splash-screen').hide();

                    this.game.state.start('DevMenu');
                });
            }
        }
    }
}