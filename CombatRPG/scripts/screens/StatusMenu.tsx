///<reference path="MenuScreen.ts" />
///<reference path="Inventory.tsx" />

namespace CombatRPG {
    export namespace Screens {
        export class StatusMenu implements MenuScreen {
            private game: Phaser.Game;
            private inventory: Inventory;

            constructor(game: Phaser.Game) {
                this.game = game;

                this.inventory = new Inventory(game);
            }

            public showMenu() {
                this.game.paused = true;
                this.createMenu();
            }

            private createMenu() {
                var statusMenuText = (<div><b>Status Menu</b>
                    <div>HP: {this.game.player.status.currentHP}/{this.game.player.status.maxHP}</div>
                    <div>Strength: {this.game.player.status.strength}</div>
                    <div>Defense: {this.game.player.status.defense}</div>
                    <br />
                    <div>Gold: {this.game.player.gold}</div>
                    <div className="link" onClick={e => this.inventory.showMenu() }>Inventory</div>
                    <hr />
                    <div className="link" onClick={e => this.closeMenu() }>Close</div>
                </div>);

                var target = document.getElementById("status-menu-screen");

                React.render(statusMenuText, target);

                $("#status-menu-screen").show();
            }

            private closeMenu() {
                $("#status-menu-screen").hide();
                this.game.paused = false;
            }
        }
    }
}