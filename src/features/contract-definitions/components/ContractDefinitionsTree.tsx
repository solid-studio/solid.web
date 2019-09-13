import React from 'react'
// import { Action, ActionCreator } from 'redux' Not needed maybe
import { ActionCreator, Action } from 'redux'
import { Icon } from 'antd'

import { ContractDefinition } from '../types'
import { ContractDefinitionsTreeComponent } from './ContractDefinitionsTreeComponent'
import { TreeNodeStyled } from 'components/GenericTreeStyledComponents'

interface Props {
  contractDefinitions: ContractDefinition[]
  onContractDefinitionSelected: ActionCreator<Action>
}

const rightClickOptions = undefined

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
            icon={<Icon type="file" />}
            title={item.name}
            key={item._id}
            style={{ color: 'white' }}>
          </TreeNodeStyled>
        )}
        selectorPrefix="contract-definitions"
        onClickDataItem={(value: string | undefined, props: any) => {
          console.log("CONTRACT ID", value)
          const contractToShow = this.props.contractDefinitions.find(item => {
            console.log("ITEM", item._id, props)
            return item._id === value
          })
          this.props.onContractDefinitionSelected(contractToShow)
        }}
        rightClickMenuItems={rightClickOptions}
      />
    )
  }
}
