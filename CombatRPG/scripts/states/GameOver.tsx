///<reference path="../lib/phaser.d.ts" />

namespace CombatRPG {
    export namespace States {
        export class GameOver extends Phaser.State {
            create() {
                var gameOverText = <h1>Game Over</h1>;
                var target = document.getElementById("gameover-screen");

                React.render(gameOverText, target);

                $("#gameover-screen").show();
            }

            update() {
                if (this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
                    $("#gameover-screen").hide();

                    this.game.state.start("SplashScreen", true, false);
                }
            }
        }
    }
}