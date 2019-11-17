import { Table } from 'antd';

import { TransactionReceipt } from '@solid-explorer/types'

// TODO: Do I need only transaction receipts?

export class TransactionsTableComponent extends Table<TransactionReceipt> { }