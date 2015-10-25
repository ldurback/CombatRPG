///<reference path="../Game.ts" />

namespace CombatRPG {
    export namespace Items {
        export abstract class Item {
            protected game: Game;
            static useInBattle: boolean;
            static useOutsideBattle: boolean;

            constructor(game: Game) {
                this.game = game;
            }

            //abstract inBattleUse();
            abstract outsideBattleUse();
        }
    }
}