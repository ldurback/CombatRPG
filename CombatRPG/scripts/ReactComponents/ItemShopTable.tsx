namespace CombatRPG {
    export namespace ReactComponents {
        export interface ItemShopTableProps extends React.Props<any> {
            availableItems: string[];
            game: Phaser.Game;
            shop: States.Shops.Shop;
        }

        export enum ItemShopDealType {
            Buy,
            Sell
        }

        interface ItemShopTableState {
            deal: ItemShopDealType;
            itemNameAndDescription: string;
        }

        export class ItemShopTable extends React.Component<ItemShopTableProps, ItemShopTableState> {
            constructor(props: ItemShopTableProps) {
                super(props);

                this.state = {
                    deal: ItemShopDealType.Buy,
                    itemNameAndDescription: ""
                };
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
                                this.props.shop.buy(itemName); this.forceUpdate();
                            } : e => { } }
                            onMouseOver={e =>
                                this.setState({
                                    deal: this.state.deal,
                                    itemNameAndDescription: itemName + ": " + itemType.description
                                })
                            }>
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

                        return <tr key={index}
                            className="link"
                            onClick={e => {
                                this.props.shop.sell(itemName);
                                this.forceUpdate();
                            } }
                            onMouseOver={e =>
                                this.setState({
                                    deal: this.state.deal,
                                    itemNameAndDescription: itemName + ": " + itemType.description
                                })
                            }>
                            <td>{itemName} ({itemAmount})</td>
                            <td>{price} Gold Each</td>
                        </tr>
                    });
                }

                return <div>
                    <div>{this.props.game.player.gold} Gold</div>
                    <span className={this.state.deal != ItemShopDealType.Buy ? "unselected link" : "link"}
                        onClick={ e => {
                            this.setState({
                                deal: ItemShopDealType.Buy,
                                itemNameAndDescription: ""
                            })
                        } }>Buy</span>
                    {" "}
                    <span
                        className={this.state.deal != ItemShopDealType.Sell ? "unselected link" : "link"}
                        onClick={ e => {
                            this.setState({
                                deal: ItemShopDealType.Sell,
                                itemNameAndDescription: ""
                            });
                        } }>Sell</span>
                    <hr />
                    <table><tbody>{items}</tbody></table>
                    {this.state.itemNameAndDescription != "" ? <hr /> : ""}
                    <div>{this.state.itemNameAndDescription}</div>
                </div>
            }
        }
    }
}