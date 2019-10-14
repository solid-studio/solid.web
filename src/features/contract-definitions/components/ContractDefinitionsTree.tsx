import React from 'react'
// import { Action, ActionCreator } from 'redux' Not needed maybe
import { ActionCreator, Action } from 'redux'
import { Icon } from 'antd'

import { ContractDefinition } from '@solidstudio/solid.types'

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
            key={item.id}
            style={{ color: 'white' }}/>
        )}
        selectorPrefix="contract-definitions"
        onClickDataItem={(value: string | undefined | string[], props: any) => {
          // TODO: I need to fix this..
          const contractToShow = this.props.contractDefinitions.find(item => {
            const valueToCompare = value !== undefined ? value![0] : 1
            return item.id === valueToCompare
          })
          this.props.onContractDefinitionSelected({
            ...contractToShow,
            type: 'editor'
          })
        }}
        rightClickMenuItems={rightClickOptions}
      />
    )
  }
}
