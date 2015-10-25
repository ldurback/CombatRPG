namespace CombatRPG {
    export namespace Items {
        export class BlankItem extends Item {
            static useInBattle = false;
            static useOutsideBattle = false;

            //inBattleUse(target: BattleEntity) { }
            outsideBattleUse() { }
        }
    }
}