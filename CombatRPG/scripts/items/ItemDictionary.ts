namespace CombatRPG {
    export namespace Items {
        export var itemDictionary: { [index: string]: any };

        itemDictionary = [];
        itemDictionary["Potion"] = Potion;
        itemDictionary["BlankItem"] = BlankItem;
    }
}