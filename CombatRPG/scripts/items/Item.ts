///<reference path="../Game.ts" />

namespace CombatRPG {
    export namespace Items {
        export abstract class Item {
            protected game: Game;
            static useInBattle: boolean;
            static useOutsideBattle: boolean;

            static buyingPrice: number;
            static sellingPrice: number;

            static description: string;

            constructor(game: Game) {
                this.game = game;
            }

            abstract inBattleUse(target: Entities.Battle.Entity);
            abstract outsideBattleUse();

            name(): string {
                var funcNameRegex = /function (.{1,})\(/;
                var results = (funcNameRegex).exec((this).constructor.toString());
                return (results && results.length > 1) ? results[1] : "";
            }
        }
    }
}