import React from 'react'

import { ColumnProps } from 'antd/es/table';

import { Storage } from '../types'

import { ContractStorageTableComponent } from './ContractStorageTableComponent';

// tslint:disable-next-line
const Web3Utils = require('web3-utils');

interface OwnProps {
    storageItems: Storage[]
}

type AllProps = OwnProps

const tableColumns: Array<ColumnProps<Storage>> = [
    {
        key: 'name',
        title: 'Name',
        dataIndex: 'name',
        align: 'center',
        width: '50%',
        render: text => <p data-testid={`contract-storage-table-row-${text}`}>{text}</p>
    },
    // {
    //     key: 'slot',
    //     title: 'Slot',
    //     dataIndex: 'slot'
    // },
    {
        key: 'value',
        title: 'Value',
        dataIndex: 'value',
        align: 'center',
        width: '50%',
        render: text => <p data-testid={`contract-storage-value-table-row-${text}`}>{Web3Utils.hexToNumberString(`0x${text}`)}</p>
    }
];

export class ContractStorageTable extends React.Component<AllProps> {
    render() {
        const { storageItems } = this.props
        return <ContractStorageTableComponent
            scroll={{ y: 240 }}
            pagination={false}
            size="small"
            className="white" rowKey="slot"
            dataSource={storageItems}
            columns={tableColumns}
            onRow={(record, rowIndex) => {
                return {
                    onClick: event => {
                        console.log("On click", record, rowIndex, event)
                        // this.props.onClick(record)
                    },
                    onDoubleClick: event => {
                        console.log("On double click", record, rowIndex, event)
                        // this.props.onDoubleClick(record)
                    }
                };
            }}

        />
    }
}