///<reference path="../items/ItemDictionary.ts" />

namespace CombatRPG {
    export namespace ReactComponents {
        export interface ItemInventoryTableProps extends React.Props<any> {
            source: Map<string, number>;
            disableUnusableInBattle: boolean;
            disableUnusableOutsideBattle: boolean;
            allowUse: boolean;

            game: Phaser.Game;
        }

        export class ItemInventoryTable extends React.Component<ItemInventoryTableProps, { itemNameAndDescription: string }> {
            constructor(props: ItemInventoryTableProps) {
                super(props);

                this.state = {
                    itemNameAndDescription: ""
                };
            }

            tryUseItem(itemName: string) {
                var itemAmount: number = this.props.game.player.items.get(itemName);
                if (itemAmount <= 0)
                    return; //failed

                var itemType: any = Items.itemDictionary[itemName];

                var item: Items.Item = (new itemType(this.props.game)) as Items.Item;

                if (this.props.game.inBattle) {
                    item.inBattleUse(this.props.game.player.battleEntity);
                }
                else {
                    item.outsideBattleUse();
                }

                this.props.game.player.items.set(itemName, itemAmount - 1);

                this.forceUpdate();
            }

            render() {
                var items = Utils.mapToArray(this.props.source).map((nameAndAmount: [string, number], index: number, array: [string, number][]) => {
                    var itemName = nameAndAmount[0];
                    var itemAmount = nameAndAmount[1];

                    if (itemAmount <= 0) // hide items with 0 amount
                        return <tr key={index}></tr>;

                    var itemType: any = Items.itemDictionary[nameAndAmount[0]];

                    if (itemType == null) {
                        console.log(itemName + " is not an item registered in the dictionary");

                        return <tr key={index}></tr>;
                    }

                    var disabled: boolean = false;

                    if (this.props.disableUnusableInBattle && itemType.useInBattle == false) {
                        disabled = true;
                    }

                    if (this.props.disableUnusableOutsideBattle && itemType.useOutsideBattle == false) {
                        disabled = true;
                    }

                    return <tr className={disabled ? "disabledItem" : ""}
                        onClick={!disabled && this.props.allowUse ? e => { this.tryUseItem(nameAndAmount[0]) } : e => { } }
                        onMouseOver={ e => {
                            this.setState({
                                itemNameAndDescription: itemName + ": " + itemType.description
                            })
                        } }
                        key={index}>
                        <td>{nameAndAmount[1]}</td>
                        <td>{nameAndAmount[0]}</td>
                    </tr>;
                });

                return <div>
                    <table><tbody>{items}</tbody></table>
                    {this.state.itemNameAndDescription != "" ? <hr /> : ""}
                    <div>{this.state.itemNameAndDescription}</div>
                </div>;
            }

            
        }
    }
}