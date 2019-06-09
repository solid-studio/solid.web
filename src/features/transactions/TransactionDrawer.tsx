import React from 'react'

import { Drawer, Collapse } from 'antd'

import { Transaction } from './types'

interface Props {
    visible: boolean
    onClose: () => void
    transactionReceipts: Transaction[]
}

const callback = (key: any) => {
    console.log(key)
}

const Panel = Collapse.Panel

export const TransactionDrawer: React.FC<Props> = (props: Props) => (
    <Drawer
        width={600}
        title="Basic Drawer"
        placement="right"
        closable={false}
        onClose={props.onClose}
        visible={props.visible}
    >
        <Collapse defaultActiveKey={['1']} onChange={callback}>
            {props.transactionReceipts &&
                props.transactionReceipts.length > 0 &&
                props.transactionReceipts.map((item: Transaction) => {
                    return (
                        <Panel
                            header={
                                <div>
                                    <h4>Transaction Hash</h4>
                                    <h5>{item.transactionHash}</h5>
                                </div>
                            }
                            key={item.transactionHash}
                        >
                            <p>{item.transactionHash}</p>
                        </Panel>
                    )
                })}
        </Collapse>
    </Drawer>
)
