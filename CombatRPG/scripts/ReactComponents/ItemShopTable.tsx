namespace CombatRPG {
    export namespace ReactComponents {
        export interface ItemShopTableProps extends React.Props<any> {
            availableItems: string[];
            game: Phaser.Game;
        }

        export enum ItemShopDealType {
            Buy,
            Sell
        }

        export class ItemShopTable extends React.Component<ItemShopTableProps, { deal: ItemShopDealType }> {
            constructor(props: ItemShopTableProps) {
                super(props);

                this.state = { deal: ItemShopDealType.Buy };
            }

            buy(itemName: string) {
                var itemType: any = Items.itemDictionary[itemName];
                if (this.props.game.player.gold < itemType.buyingPrice)
                    throw "Error: Shop tried to let a player buy an item too expensive for him";

                this.props.game.player.gold -= itemType.buyingPrice;
                this.props.game.player.items.set(itemName,
                    this.props.game.player.items.get(itemName) + 1);
            }

            sell(itemName: string) {
                var itemType: any = Items.itemDictionary[itemName];

                if (this.props.game.player.items.get(itemName) < 1)
                    throw "Error: Shop tried to let a player sell an item he didn't have";

                this.props.game.player.gold += itemType.sellingPrice;
                this.props.game.player.items.set(itemName,
                    this.props.game.player.items.get(itemName) - 1);
            }

            render() {
                var items: any;

                if (this.state.deal == ItemShopDealType.Buy) { // if we're buying, get the shop inventory's prices
                    items = this.props.availableItems.map((itemName: string, index: number, array: string[]) => {
                        var itemType: any = Items.itemDictionary[itemName];
                        var price: number = itemType.buyingPrice;

                        return <tr key={index}
                            className={price <= this.props.game.player.gold ? "link" : "unavailable"}
                            onClick={price <= this.props.game.player.gold ? e => {
                                this.buy(itemName); this.forceUpdate();
                            } : e => { } }>
                            <td>{itemName}</td>
                            <td>{price} Gold</td>
                        </tr>
                    });
                }
                else if (this.state.deal == ItemShopDealType.Sell) { // if we're selling, get the player's inventory's prices
                    var playerInventory = Utils.mapToArray(this.props.game.player.items);
                    items = playerInventory.map((itemNameAndAmount: [string, number], index: number, array: [string, number][]) => {
                        var itemName = itemNameAndAmount[0];
                        var itemAmount = itemNameAndAmount[1];

                        if (itemAmount <= 0)
                            return <tr key={index}></tr>;

                        var itemType: any = Items.itemDictionary[itemName];
                        var price: number = itemType.sellingPrice;

                        return <tr key={index} className="link" onClick={e => {
                            this.sell(itemName);
                            this.forceUpdate();
                        } }>
                            <td>{itemName} ({itemAmount})</td>
                            <td>{price} Gold Each</td>
                        </tr>
                    });
                }

                return <div>
                    <div>{this.props.game.player.gold} Gold</div>
                    <span className={this.state.deal != ItemShopDealType.Buy ? "unselected link" : "link"}
                        onClick={ e => { this.setState({ deal: ItemShopDealType.Buy }) } }>Buy</span>
                    {" "}
                    <span
                        className={this.state.deal != ItemShopDealType.Sell ? "unselected link" : "link"}
                        onClick={ e => { this.setState({ deal: ItemShopDealType.Sell }); } }>Sell</span>
                    <hr />
                    <table><tbody>{items}</tbody></table>
                </div>
            }
        }
    }
}