namespace CombatRPG {
    export interface MenuProps extends React.Props<any> {
        title: string;
        open?: boolean;
    }

    export class Menu extends React.Component<MenuProps, { open: boolean }> {
        constructor(props: MenuProps) {
            super(props);

            if (this.props.open !== null) {
                this.state = { open: this.props.open };
            }
            else {
                this.state = { open: false };
            }
        }

        toggleOpen() {
            var newOpenState = !this.state.open;

            this.setState({ open: newOpenState });
        }

        render() {
            return (<div>
                <div onClick={e => this.toggleOpen() }>
                    {this.props.title}
                </div>
                {this.state.open && this.props.children}
            </div>);
        }
    }
}