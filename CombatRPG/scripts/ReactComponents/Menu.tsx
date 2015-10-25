namespace CombatRPG {
    export namespace ReactComponents {
        export interface MenuProps extends React.Props<any> {
            title: string;
            open?: boolean;
            titleClassName: string;
        }

        export class Menu extends React.Component<MenuProps, { open: boolean }> {
            constructor(props: MenuProps) {
                super(props);

                if (this.props.open != null) {
                    this.state = { open: this.props.open };
                }
                else {
                    this.state = { open: false };
                }
            }

            toggleOpen() {
                this.setState({ open: !this.state.open });
            }

            render() {
                return (<div>
                <div className={this.props.titleClassName} onClick={e => this.toggleOpen() }>
                    {this.props.title}
                    </div>
                {this.state.open && this.props.children}
                    </div>);
            }
        }
    }
}