interface MessageProps extends React.Props<any> {
    name?: string;
    text: string;
}

class Message extends React.Component<MessageProps, {}> {
    render() {
        return <div>
                {this.props.name && <span>{this.props.name}: </span>}
                {this.props.text}
            </div>;
    }
}

interface ConversationBoxProps extends React.Props<any> {
    onClose?: () => void;
}

class ConversationBox extends React.Component<ConversationBoxProps, { messageNumber: number }> {
    constructor(props: any) {
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

        var buttonText: string;
        if (this.state.messageNumber + 1 < childArray.length) {
            buttonText = "Next";
        }
        else {
            buttonText = "Done";
        }

        if (this.state.messageNumber + 1 <= childArray.length) {
            return <div>
                {childArray[this.state.messageNumber]}

                <button onClick={ e => this.nextMessage() }>{buttonText}</button>
            </div>;
        }
        else {
            this.props.onClose();

            return <div></div>;
        }
    }
}