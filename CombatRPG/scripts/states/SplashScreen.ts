namespace CombatRPG {

    export class SplashScreen extends Phaser.State {
        create() {
            $('#splash-screen').show();

            this.game.state.add('Loader', Loader, false);

            $('#splash-screen').on("click", (e: Event) => {
                $('#splash-screen').hide();

                this.game.state.start('Loader');
            });
        }
    }

}