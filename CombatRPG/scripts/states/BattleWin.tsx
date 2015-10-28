///<reference path="../lib/phaser.d.ts" />
///<reference path="../ReactComponents/ItemInventoryTable.tsx" />

namespace CombatRPG {
    export namespace States {
        export class BattleWin extends Phaser.State {
            create() {
                this.renderLootScreen();
                this.getLoot();
            }

            getLoot() {
                this.game.loot.items.forEach((itemAmount: number, itemName: string, map: Map<string, number>) => {
                    if (itemAmount > 0) {
                        if (!this.game.player.items.has(itemName))
                            this.game.player.items.set(itemName, 0);

                        this.game.player.items.set(itemName, this.game.player.items.get(itemName) + itemAmount);
                    }
                });

                this.game.player.gold += this.game.loot.gold;

                this.game.loot.gold = 0;
                this.game.loot.items.clear();
            }

            renderLootScreen() {
                var battleWonText = <div><b>Loot</b>
                    <div>{this.game.loot.gold} Gold</div>
                    <ReactComponents.ItemInventoryTable
                        game={this.game}
                        source={this.game.loot.items}
                        allowUse={false}
                        disableUnusableInBattle={false}
                        disableUnusableOutsideBattle={false} />
                    </div>;

                var target = document.getElementById("status-menu-screen");

                React.render(battleWonText, target);

                $("#status-menu-screen").show();
            }

            update() {
                if (this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
                    $("#status-menu-screen").hide();

                    this.game.state.start(this.game.return.state, true, false);
                }
            }
        }
    }
}