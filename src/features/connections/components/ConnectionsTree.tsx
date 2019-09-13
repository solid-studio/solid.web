import React from 'react'
import { Action, ActionCreator } from 'redux'
import { Icon } from 'antd'

import { Connection } from '../types'
import { ConnectionsTreeComponent } from './ConnectionsTreeComponent'
import { TreeNodeStyled } from 'components/GenericTreeStyledComponents'

interface Props {
  connections: Connection[]
  onNewConnectionClick: ActionCreator<Action>
}

interface ExtraArguments {
  connectionId: string,
  type: 'transactions' | 'blocks' | 'contracts'
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
            icon={<Icon type="database" />}
            title={item.name}
            key={item.url}
            style={{ color: 'white' }}>

            <TreeNodeStyled
              extra={{ connectionId: item._id, type: 'contracts' }}
              icon={({ selected }: any) => <Icon type={selected ? 'folder' : 'folder'} />}
              title={"Contracts"}
              key={`${item.name}-contracts`}
              style={{ color: 'white' }}>
            </TreeNodeStyled>

            <TreeNodeStyled
              extra={{ connectionId: item._id, type: 'transactions' }}
              icon={({ selected }: any) => <Icon type={selected ? 'folder' : 'folder'} />}
              title={"Transactions"}
              key={`${item.name}-transactions`}
              style={{ color: 'white' }}>
            </TreeNodeStyled>

            <TreeNodeStyled
              extra={{ connectionId: item._id, type: 'blocks' }}
              icon={({ selected }: any) => <Icon type={selected ? 'folder' : 'folder'} />}
              title={"Blocks"}
              key={`${item.name}-blocks`}
              style={{ color: 'white' }}>
            </TreeNodeStyled>

          </TreeNodeStyled>
        )}
        selectorPrefix="connections"
        onClickDataItem={(value: string | undefined, node: any, extra: ExtraArguments) => {
          if (extra) {
            const { connectionId, type } = extra
            console.log("TREE NODE CLICKED", value, connectionId, type)
          }
        }}
        rightClickMenuItems={rightClickOptions}
      />
    )
  }
}
