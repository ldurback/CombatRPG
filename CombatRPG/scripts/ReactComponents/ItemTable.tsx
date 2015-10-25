///<reference path="../items/ItemDictionary.ts" />

namespace CombatRPG {
    export namespace ReactComponents {
        export interface ItemTableProps extends React.Props<any> {
            source: Map<string, number>;
            disableUnusableInBattle: boolean;
            disableUnusableOutsideBattle: boolean;
            allowUse: boolean;

            game: Phaser.Game;
        }

        export class ItemTable extends React.Component<ItemTableProps, {}> {
            tryUseItem(itemName: string) {
                var itemAmount: number = this.props.game.player.items.get(itemName);
                if (itemAmount <= 0)
                    return; //failed

                var itemType: any = Items.itemDictionary[itemName];

                var item: Items.Item = (new itemType(this.props.game)) as Items.Item;

                if (this.props.game.inBattle) {
                    throw "In battle item usage not implemented";
                }
                else {
                    item.outsideBattleUse();
                }

                this.props.game.player.items.set(itemName, itemAmount - 1);

                this.forceUpdate();
            }

            render() {
                var rows = Utils.mapToArray(this.props.source).map((nameAndAmount: [string, number], index: number, array: [string, number][]) => {
                    var itemType: any = Items.itemDictionary[nameAndAmount[0]];

                    var disabled: boolean = false;

                    if (this.props.disableUnusableInBattle && itemType.useInBattle == false) {
                        disabled = true;
                    }

                    if (this.props.disableUnusableOutsideBattle && itemType.useOutsideBattle == false) {
                        disabled = true;
                    }

                    return <tr className={disabled ? "disabledItem" : ""}
                        onClick={!disabled && this.props.allowUse ? e => { this.tryUseItem(nameAndAmount[0]) } : e => { } }
                        key={index}>
                        <td>{nameAndAmount[1]}</td>
                        <td>{nameAndAmount[0]}</td>
                    </tr>;
                });

                return <table><tbody>{rows}</tbody></table>;
            }

            
        }
    }
}