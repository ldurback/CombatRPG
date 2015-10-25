namespace CombatRPG {
    export namespace ReactComponents {
        export interface ConversationBoxProps extends React.Props<any> {
            onClose: () => void;
        }

        export class ConversationBox extends React.Component<ConversationBoxProps, { messageNumber: number }> {
            constructor(props: ConversationBoxProps) {
                super(props);

                this.state = {
                    messageNumber: 0
                };
            }

            advanceMessage() {
                this.setState({
                    messageNumber: this.state.messageNumber + 1
                });
            }

            resetAndCloseMessage() {
                this.setState({ messageNumber: 0 });
                this.props.onClose();
            }

            render() {
                var childArray = React.Children.toArray(this.props.children);

                // if not last message
                if (this.state.messageNumber + 1 < childArray.length) {
                    return (<div className="message" onClick={ e => this.advanceMessage() }>
                    {childArray[this.state.messageNumber]}
                        </div>);
                }
                // if last message
                else {
                    return (<div className="message" onClick={ e => this.resetAndCloseMessage() }>
                    {childArray[this.state.messageNumber]}
                        </div>);
                }
            }
        }
    }
}