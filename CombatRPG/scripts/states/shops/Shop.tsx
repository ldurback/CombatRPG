///<reference path="../../ReactComponents/ItemShopTable.tsx" />

namespace CombatRPG {
    export namespace States {
        export namespace Shops {
            export abstract class Shop extends Phaser.State {
                protected inventory: string[];
                protected title: string;

                protected abstract setTitleAndInventory();

                create() {
                    this.setTitleAndInventory();

                    var shopText = <div><b>{this.title}</b>
                        <br />
                        <ReactComponents.ItemShopTable availableItems={this.inventory}
                            game={this.game} />
                        <hr />
                        <div className="link" onClick={e => this.exitStore() }>Exit</div>
                    </div>

                    var target = document.getElementById("shop-menu-screen");

                    React.render(shopText, target);

                    $("#shop-menu-screen").show();
                }

                exitStore() {
                    $("#shop-menu-screen").hide();

                    this.game.state.start(this.game.return.state);
                }
            }
        }
    }
}