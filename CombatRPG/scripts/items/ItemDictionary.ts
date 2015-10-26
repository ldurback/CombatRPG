///<reference path="Potion.ts" />

namespace CombatRPG {
    export namespace Items {
        export var itemDictionary: { [index: string]: any };

        itemDictionary = [];
        itemDictionary["Potion"] = Potion;
    }
}