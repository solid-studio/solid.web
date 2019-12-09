import React from 'react'
import { Action, ActionCreator } from 'redux'
import { Icon } from 'antd'

import { Connection, ConnectionType } from '@solid-explorer/types'

import { ConnectionsTreeComponent } from './ConnectionsTreeComponent'
import { TreeNodeStyled } from 'components/GenericTreeStyledComponents'

interface Props {
  connections: Connection[]
  onNewConnectionClick: ActionCreator<Action>
  onConnectionItemSelected: ActionCreator<Action>
}

interface ExtraArguments {
  connectionId: number,
  nodeType: 'transactions' | 'blocks' | 'contracts'
}

const rightClickOptions = [{
  id: 'deploy',
  name: 'Deploy'
},
{
  id: 'openconsole',
  name: 'Open Console'
}]

export class ConnectionsTree extends React.Component<Props> {
  render() {
    const { connections, onNewConnectionClick } = this.props
    return (
      <ConnectionsTreeComponent headerTitle="Connections"
        dataItems={connections}
        onPlusClick={onNewConnectionClick}
        onCollapseClick={onNewConnectionClick}
        DataRowComponentRender={(item: Connection) => (
          <TreeNodeStyled
            blockNode={true}
            icon={<Icon type="database" />}
            title={item.type === ConnectionType.Public ? item.name : `${item.name} (${item.url})`}
            key={item.id}
            style={{ color: 'white' }}>

            <TreeNodeStyled
              extra={{ connectionId: item.id, nodeType: 'contracts' }}
              icon={({ selected }: any) => <Icon type={selected ? 'folder' : 'folder'} />}
              title={"Contracts"}
              key={`${item.name}-contracts`}
              style={{ color: 'white' }} />

            <TreeNodeStyled
              extra={{ connectionId: item.id, nodeType: 'transactions' }}
              icon={({ selected }: any) => <Icon type={selected ? 'folder' : 'folder'} />}
              title={"Transactions"}
              key={`${item.name}-transactions`}
              style={{ color: 'white' }} />

            <TreeNodeStyled
              extra={{ connectionId: item.id, nodeType: 'blocks' }}
              icon={({ selected }: any) => <Icon type={selected ? 'folder' : 'folder'} />}
              title={"Blocks"}
              key={`${item.name}-blocks`}
              style={{ color: 'white' }} />

          </TreeNodeStyled>
        )}
        selectorPrefix="connections"
        onClickDataItem={(value: string | undefined, node: any, extra: ExtraArguments) => {
          if (extra) {
            const { connectionId, nodeType } = extra
            const connectionToShow = this.props.connections.find(item => {
              return item.id === connectionId
            })
            this.props.onConnectionItemSelected({
              ...connectionToShow,
              nodeType: `${nodeType}`
            })
          }
        }}
        rightClickMenuItems={rightClickOptions}
      />
    )
  }
}
