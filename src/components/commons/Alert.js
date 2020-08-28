import React, { Component } from "react";
import { Button, Confirm, Message, Modal } from "semantic-ui-react";

class Alert extends Component {
    handleButtonClick = () => this.setState({ open: true });
    handleConfirm = () => this.props.onConfirm();
    handleCancel = () => this.props.onCancel();

    render() {
        const {
            type,
            title,
            action,
            open,
            onConfirm,
            onCancel,
            children,
        } = this.props;
        return (
            <div>
                <Modal size="mini" open={open} onClose={this.handleCancel}>
                    <Modal.Content>
                        <div className="ui center aligned grid">
                            <div className="ui center aligned row">
                                <h2 className="ui warning">{title}</h2>
                            </div>
                            <div className="ui center aligned row">
                                {type == "success" && (
                                    <i
                                        className="check circle outline huge icon green"
                                        positive
                                    />
                                )}
                                {type == "warning" && (
                                    <i
                                        className="exclamation triangle huge icon yellow"
                                        positive
                                    />
                                )}
                                {type == "failure" && (
                                    <i
                                        className="times circle outline huge icon red"
                                        positive
                                    />
                                )}
                            </div>
                            <div className="ui center aligned row">
                                {children}
                            </div>
                        </div>
                    </Modal.Content>
                    <Modal.Actions>
                        {onCancel && (
                            <Button
                                basic
                                color={"black"}
                                onClick={this.handleCancel}
                            >
                                Cancel
                            </Button>
                        )}
                        {onConfirm && (
                            <Button
                                color="teal"
                                content={action}
                                onClick={this.handleConfirm}
                            />
                        )}
                    </Modal.Actions>
                </Modal>
            </div>
        );
    }
}

export { Alert };
