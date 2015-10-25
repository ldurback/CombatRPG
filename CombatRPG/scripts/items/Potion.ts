///<reference path="Item.ts" />

namespace CombatRPG {
    export namespace Items {
        export class Potion extends Item {
            static useInBattle = true;
            static useOutsideBattle = true;

            /*inBattleUse(target: BattleEntity) {
                target.stats.currentHP += (target.stats.maxHP / 5);
                if (target.stats.currentHP > target.stats.maxHP)
                    target.stats.currentHP = target.stats.maxHP;
            }*/

            outsideBattleUse() {
                var playerStats: Entities.Status = this.game.player.status;

                playerStats.currentHP += (playerStats.maxHP / 5);
                if (playerStats.currentHP > playerStats.maxHP)
                    playerStats.currentHP = playerStats.maxHP;
            }
        }
    }
}