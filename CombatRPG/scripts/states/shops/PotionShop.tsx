///<reference path="Shop.tsx" />

namespace CombatRPG {
    export namespace States {
        export namespace Shops {
            export abstract class PotionShop extends Shop {
                protected setTitleAndInventory() {
                    this.title = "Potion Shop";
                    this.inventory = ["Potion"];
                }
            }
        }
    }
}