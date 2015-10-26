///<reference path="Item.ts" />
///<reference path="../entities/Status.ts" />
///<reference path="../entities/battle/Entity.ts" />

namespace CombatRPG {
    export namespace Items {
        export class Potion extends Item {
            static useInBattle = true;
            static useOutsideBattle = true;

            static buyingPrice = 5;
            static sellingPrice = 2;

            static description = "Heal 20% of HP";

            inBattleUse(target: Entities.Battle.Entity) {
                target.status.currentHP += (target.status.maxHP / 5);
                if (target.status.currentHP > target.status.maxHP)
                    target.status.currentHP = target.status.maxHP;
            }

            outsideBattleUse() {
                var playerStats: Entities.Status = this.game.player.status;

                playerStats.currentHP += (playerStats.maxHP / 5);
                if (playerStats.currentHP > playerStats.maxHP)
                    playerStats.currentHP = playerStats.maxHP;
            }
        }
    }
}