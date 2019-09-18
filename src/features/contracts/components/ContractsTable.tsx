import React from 'react'

import { ColumnProps } from 'antd/es/table';

import { Contract } from '../types';
import { ContractTableComponent } from './ContractsTableComponent';

interface OwnProps {
    contracts?: Contract[]
    onClick: any // TODO type correctly
    onDoubleClick: any // TODO type correctly
    onMouseLeave: any // TODO: type correctly
}

type AllProps = OwnProps //& DispatchProps & StateProps

const tableColumns: ColumnProps<Contract>[] = [
    {
        key: 'name',
        title: 'Contract Name',
        dataIndex: 'name',
    },
    {
        key: 'address',
        title: 'Contract Address',
        dataIndex: 'address',
    },
    {
        key: 'transactionCount',
        title: 'Transaction Count',
        dataIndex: 'transactionCount',
    },
    {
        key: 'creationDate',
        title: 'Creation Date',
        dataIndex: 'creationDate',
    },
    {
        key: 'lastExecutionDate',
        title: 'Last Execution Date',
        dataIndex: 'lastExecutionDate',
    }

];

export class ContractsTable extends React.Component<AllProps> {
    render() {
        const { contracts } = this.props
        console.log("CONTRACTS TABLE DATA", contracts)
        return <ContractTableComponent rowKey="_id" dataSource={contracts} columns={tableColumns}
            onRow={(record, rowIndex) => {
                return {
                    onClick: event => {
                        this.props.onClick(record)
                    }, // click row
                    onDoubleClick: event => {
                        this.props.onDoubleClick(record)
                    }, // double click row
                    onContextMenu: event => { }, // right button click row
                    onMouseEnter: event => { }, // mouse enter row
                    onMouseLeave: event => {
                        this.props.onMouseLeave()
                    }, // mouse leave row
                };
            }}

        />
    }
}