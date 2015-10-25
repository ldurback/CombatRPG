namespace CombatRPG {
    export namespace ReactComponents {
        export interface MessageProps extends React.Props<any> {
            imageURL?: string;
            name: string;
        }

        export class Message extends React.Component<MessageProps, {}> {
            render() {
                return <div>
                {this.props.imageURL && <img src={this.props.imageURL} />}
                <span>{this.props.name}: </span>
                {this.props.children}
                    </div>;
            }
        }
    }
}