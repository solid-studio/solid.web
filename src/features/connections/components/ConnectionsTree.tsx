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
          </TreeNodeStyled>
        )}
        selectorPrefix="connections"
        onClickDataItem={undefined}
        rightClickMenuItems={rightClickOptions}
      />
    )
  }
}
