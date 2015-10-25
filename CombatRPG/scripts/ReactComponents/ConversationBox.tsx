interface ConversationBoxProps extends React.Props<any> {
    onClose: () => void;
}

class ConversationBox extends React.Component<ConversationBoxProps, { messageNumber: number }> {
    constructor(props: ConversationBoxProps) {
        super(props);

        this.state = {
            messageNumber: 0
        };
    }

    nextMessage() {
        var nextMessageNumber: number = this.state.messageNumber + 1;

        this.setState({
            messageNumber: nextMessageNumber
        });
    }

    render() {
        var childArray = React.Children.toArray(this.props.children);

        if (this.state.messageNumber < childArray.length) {
            return (<div className="message" onClick={ e => this.nextMessage() }>
                {childArray[this.state.messageNumber]}
            </div>);
        }
        else {
            this.props.onClose();

            // reset conversation box
            this.setState({ messageNumber: 0 });

            return <div></div>;
        }
    }
}