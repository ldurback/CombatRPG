///<reference path="lib/phaser.d.ts" />

///<reference path="entities/Status.ts" />
///<reference path="screens/StatusMenu.tsx" />
///<reference path="states/Boot.ts" />

namespace Phaser {
    export interface Game {
        player: {
            status: CombatRPG.Entities.Status;
            gold: number;
            items: Map<string, number>;
        }

        loot: {
            gold: number;
            items: Map<string, number>;
        }

        return: {
            state: string;
            position: {
                x: number;
                y: number;
            };
        }

        inBattle: boolean;

        statusMenu: CombatRPG.Screens.StatusMenu;
    }
}

namespace CombatRPG {
    export class Game extends Phaser.Game {
        constructor() {
            super(800, 600, Phaser.AUTO, 'content', null);

            this.player = {
                status: {
                    currentHP: 10,
                    maxHP: 10,
                    strength: 2,
                    defense: 2
                },

                gold: 0,

                items: new Map<string, number>()
            };

            this.player.items.set('Potion', 2);
            this.player.items.set('BlankItem', 5);

            this.loot = {
                gold: 0,
                items: new Map<string, number>()
            };

            this.return = {
                state: null,
                position: {
                    x: null,
                    y: null
                }
            };

            this.inBattle = false;

            this.statusMenu = new Screens.StatusMenu(this);

            this.state.add('Boot', States.Boot, false);

            this.state.start('Boot');
        }
    }
}