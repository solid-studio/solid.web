import React from 'react'

import { AbiItem } from 'web3-utils'
import { Collapse } from 'antd'

import { Transaction, Connection, TransactionReceipt } from '@solid-explorer/types'
import { TableDetails } from 'components'

interface TransactionDetailsProps {
    transaction: TransactionReceipt
    currentConnection?: Connection
}

export class TransactionDetails extends React.Component<TransactionDetailsProps>{
    render() {
        const { transaction, currentConnection } = this.props
        const { transactionHash, status, blockNumber, from, to, gasUsed, cumulativeGasUsed } = transaction
        return (
            <div style={{ color: "white", padding: "1em 1em" }}>
                <TableDetails>
                    <thead>
                        <tr>
                            <th>Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Transaction Hash</td>
                            <td>{transactionHash}</td>
                        </tr>
                        <tr>
                            <td>Status</td>
                            <td>{status}</td>
                        </tr>
                        <tr>
                            <td>Block Number</td>
                            <td>
                                {blockNumber}
                            </td>
                        </tr>
                        <tr>
                            <td>Timestamp</td>
                            <td>
                                0x0
                            </td>
                        </tr>
                        <tr>
                            <td>From</td>
                            <td>
                                {from}
                            </td>
                        </tr>
                        <tr>
                            <td>To</td>
                            <td>
                                {to}
                            </td>
                        </tr>
                        <tr>
                            <td>Value</td>
                            <td>
                                0x0
                            </td>
                        </tr>
                        <tr>
                            <td>Transaction Fee</td>
                            <td>
                                0x0
                            </td>
                        </tr>
                        <tr>
                            <td>Gas Limit</td>
                            <td>
                                0x0
                            </td>
                        </tr>
                        <tr>
                            <td>Gas Used by Transaction</td>
                            <td>
                                {cumulativeGasUsed}
                            </td>
                        </tr>
                        <tr>
                            <td>Nonce</td>
                            <td>
                                0x0
                            </td>
                        </tr>
                        <tr>
                            <td>Input Data</td>
                            <td>
                                0x0
                            </td>
                        </tr>
                    </tbody>
                </TableDetails>
            </div >
        )
    }

}
