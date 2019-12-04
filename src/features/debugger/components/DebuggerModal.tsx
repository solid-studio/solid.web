import React from 'react'
import {Modal, Button} from 'antd'
import {buildFakeTransaction} from '@solid-explorer/types'

interface Props {
    visible: boolean,
    onClose?: () => any | void
}

interface States {
    visible: boolean
}

export class DebuggerModal extends React.Component<Props, States> {

    constructor(parameters: { props: any }) {
        const props = parameters.props;
        super(props);

        this.state = {
            visible: false
        }

        this.handleClose = this.handleClose.bind(this);

    }

    componentWillReceiveProps(nextProps: Readonly<Props>, nextContext: any): void {
        if (nextProps && nextProps.hasOwnProperty('visible') && (nextProps.visible != null && nextProps.visible != undefined)) {
            this.setState({ visible: nextProps.visible });
        }
    }

    handleClose() {
        if (this.props.hasOwnProperty('onClose') && this.props.onClose) {
            this.props.onClose();
        }
    }

    render() {
        const sampleTransaction = buildFakeTransaction()

        const { visible } = this.state;

        return (
            <Modal
                visible={visible}
                title={`Transaction hash: ${sampleTransaction.hash}`}
                centered={true}
                footer={[
                    <Button type="danger" key="cancel" onClick={this.handleClose}>
                        Close
                    </Button>
                    // <Button key="submit" type="primary" loading={loading} onClick={this.handleOk}>
                    //     Submit
                    // </Button>,
                ]}
                afterClose={this.handleClose}
                destroyOnClose={true}
                okText={"Close"}
                bodyStyle={{height: "80vh"}}
                width={"96%"}/>
        )
    }
}
