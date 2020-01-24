import React from 'react'
import { AbiItem } from 'web3-utils'

import { Block, Connection } from '@solid-explorer/types'

import { TableDetails } from 'components'

interface BlockDetailsProps {
    block: Block
    currentConnection?: Connection
}

// Transactions
// Extra data?
// Sha3Uncles
// Nonce
export class BlockDetails extends React.Component<BlockDetailsProps>{
    render() {
        const { block, currentConnection } = this.props
        const { hash, parentHash, gasLimit, nonce, blockNumber, gasUsed, transactions, difficulty, totalDifficulty, size, timestamp } = block
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
                            <td>Block Height</td>
                            <td>0x0</td>
                        </tr>
                        <tr>
                            <td>Timestamp</td>
                            <td>{timestamp}</td>
                        </tr>
                        <tr>
                            <td>Transactions</td>
                            <td>
                                TODO
                            </td>
                        </tr>
                        <tr>
                            <td>Difficulty</td>
                            <td>
                                {difficulty}
                            </td>
                        </tr>
                        <tr>
                            <td>Total Difficulty</td>
                            <td>{totalDifficulty}</td>
                        </tr>
                        <tr>
                            <td>Size</td>
                            <td>{size}</td>
                        </tr>
                        <tr>
                            <td>Gas Used</td>
                            <td>{gasUsed}</td>
                        </tr>
                        <tr>
                            <td>Gas Limit</td>
                            <td>{gasLimit}</td>
                        </tr>
                        <tr>
                            <td>Hash</td>
                            <td>{hash}</td>
                        </tr>
                        <tr>
                            <td>Parent Hash</td>
                            <td>{parentHash}</td>
                        </tr>
                    </tbody>
                </TableDetails>
            </div >
        )
    }
}
