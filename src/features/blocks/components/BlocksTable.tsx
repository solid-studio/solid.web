import React from 'react'

import { ColumnProps } from 'antd/es/table';

import { Block } from '@solid-explorer/types'

import { BlocksTableComponent } from './BlocksTableComponent';

// tslint:disable-next-line
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'

TimeAgo.addLocale(en)

// tslint:disable-next-line
const Web3Utils = require('web3-utils');

interface OwnProps {
    blocks?: Block[]
    onClick: (record: Block) => void
    collapsed: boolean
    onDoubleClick: (record: Block) => void
}

type AllProps = OwnProps

const fromTimeStampToTime = (timestamp: number) => {
    const date = new Date(timestamp * 1000);

    const timeAgo = new TimeAgo('en-US')

    return timeAgo.format(date)
}

const shortText = (text: string) => {
    const firstPart = text.slice(0, 10)
    const secondPart = text.slice(text.length - 5, text.length)
    return `${firstPart}...${secondPart}`
}

export class BlocksTable extends React.Component<AllProps> {
    // constructor(props: AllProps) {
    //     super(props);
    // }

    getTableColumns(collapsed: boolean): Array<ColumnProps<Block>> {
        return [
            {
                key: 'hash',
                title: 'Block hash',
                dataIndex: 'hash',
                width: 5,
                render: (text: string) => {
                    const textToRender = collapsed ? shortText(text) : text
                    return <p data-testid={`blocks-table-row-${text}`}>{textToRender}</p>
                }
            },
            {
                key: 'blockNumber',
                title: 'Number',
                align: 'center',
                dataIndex: 'blockNumber',
            },
            {
                key: 'transactions',
                title: 'Transactions',
                align: 'center',
                dataIndex: 'transactions',
                render: (text: string, record: Block) => {
                    return record.transactions.length
                }
            },
            {
                key: 'gasUsed',
                title: 'Gas Used',
                align: 'center',
                dataIndex: 'gasUsed',
                render: (text: string) => {
                    return Web3Utils.hexToNumber(text)
                }
            },
            {
                key: 'timestamp',
                title: 'Timestamp',
                align: 'center',
                dataIndex: 'timestamp',
                render: (text: string) => {
                    const unixTimeStamp = Web3Utils.hexToNumber(text)
                    return fromTimeStampToTime(unixTimeStamp)
                }
            }
        ]
    }

    render() {
        const { blocks, collapsed } = this.props
        return <BlocksTableComponent
            rowKey="hash"
            dataSource={blocks}
            columns={this.getTableColumns(collapsed)}
            onRow={(record, rowIndex) => {
                return {
                    onClick: event => {
                        this.props.onClick(record)
                    },
                    onDoubleClick: event => {
                        this.props.onDoubleClick(record)
                    }
                };
            }}
        />
    }
}