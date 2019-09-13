import React from 'react'
// import { Action, ActionCreator } from 'redux' Not needed maybe
import { Icon } from 'antd'

import { ContractDefinition } from '../types'
import { ContractDefinitionsTreeComponent } from './ContractDefinitionsTreeComponent'
import { TreeNodeStyled } from 'components/GenericTreeStyledComponents'

interface Props {
  contractDefinitions: ContractDefinition[]
}

const rightClickOptions = undefined
const onClickDataItem = undefined

export class ContractDefinitionsTree extends React.Component<Props> {
  render() {
    const { contractDefinitions } = this.props
    return (
      <ContractDefinitionsTreeComponent headerTitle="Contract Definitions"
        dataItems={contractDefinitions}
        onPlusClick={undefined}
        onCollapseClick={undefined}
        DataRowComponentRender={(item: ContractDefinition) => (
          <TreeNodeStyled
            icon={<Icon type="database" />}
            title={item.name}
            key={item.name}
            style={{ color: 'white' }}>
          </TreeNodeStyled>
        )}
        selectorPrefix="contract-definitions"
        onClickDataItem={onClickDataItem}
        rightClickMenuItems={rightClickOptions}
      />
    )
  }
}
