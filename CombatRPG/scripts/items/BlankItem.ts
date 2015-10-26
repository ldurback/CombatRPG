///<reference path="Item.ts" />

namespace CombatRPG {
    export namespace Items {
        export class BlankItem extends Item {
            static useInBattle = false;
            static useOutsideBattle = false;

            inBattleUse(target: Entities.Battle.Entity) { }
            outsideBattleUse() { }
        }
    }
}