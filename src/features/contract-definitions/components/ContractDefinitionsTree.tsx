import React from 'react'
import { ActionCreator, Action } from 'redux'
import { Icon } from 'antd'

import { FileItem } from '@solid-explorer/types'

import { ContractDefinitionsTreeComponent } from './ContractDefinitionsTreeComponent'
import { TreeNodeStyled } from 'components/GenericTreeStyledComponents'

interface Props {
  fileItems: FileItem[]
  onContractDefinitionSelected: ActionCreator<Action>
  onFolderUploadClick: ActionCreator<Action>
}

interface State {
  expandedKeys: string[] | undefined
}

const rightClickOptions = undefined
const SELECTOR_PREFIX = "contract-definitions"

export class ContractDefinitionsTree extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      expandedKeys: []
    }
  }

  onExpand = (expandedKeys: string[] | undefined, info: any) => {
    this.setState({
      expandedKeys
    })
  }

  // onLoad = (onLoad)
  onLoad = (loadedKeys: string[], { event, node }: any) => {
    console.log("ON LOAD", node, event, loadedKeys)
  }

  getIconWithStatus = (itemName: string) => {
    if (this.state.expandedKeys) {
      return this.state.expandedKeys.includes(itemName) ? "folder-open" : "folder"
    }
  }

  render() {
    const { fileItems, onFolderUploadClick } = this.props
    return (
      <ContractDefinitionsTreeComponent
        showFolderUpload={true}
        headerTitle="Contract Definitions"
        dataItems={fileItems}
        onPlusClick={undefined}
        onFolderUploadClick={onFolderUploadClick}
        onCollapseClick={undefined}
        onExpand={this.onExpand}
        onLoad={this.onLoad}
        DataRowComponentRender={(item: FileItem) => {
          return <TreeNodeStyled
            icon={<Icon type={item.isDirectory ? this.getIconWithStatus(item.name) : "file"} />}
            title={item.name}
            key={item.name}
            isLeaf={!item.isDirectory}
            style={{ color: 'white' }}>
            {item.fileItems && item.fileItems.map((element) => (<TreeNodeStyled
              icon={<Icon type={element.isDirectory ? this.getIconWithStatus(element.name) : "file"} />}
              title={element.name}
              key={element.name}
              isLeaf={!element.isDirectory}
              style={{ color: 'white' }} />))}
          </TreeNodeStyled>
        }}
        selectorPrefix={SELECTOR_PREFIX}
        onClickDataItem={(value: string | undefined | string[], props: any) => {
          // console.log("ON CLICK DATA ITEM", value, props)
          // TODO: I need to fix this..
          // the files need to be flat...
          const valueToCompare = value !== undefined ? value![0] : ''
          const contractToShow = findContractToShow(this.props.fileItems, valueToCompare)
          // this.props.fileItems.find(item => {
          //   const valueToCompare = value !== undefined ? value![0] : ''
          //   return item.name === valueToCompare
          // })
          // I need to search deeper
          // console.log("CONTRACT TO SHOW", contractToShow)
          if (contractToShow && !contractToShow.isDirectory) {
            this.props.onContractDefinitionSelected({
              ...contractToShow,
              type: 'editor'
            })
          }
        }}
        rightClickMenuItems={rightClickOptions}
      />
    )
  }
}

// TODO: IMPROVE and Rethink
const findContractToShow = (fileItems: FileItem[], value: string): FileItem | undefined => {
  let result: FileItem | undefined

  for (const currentItem of fileItems) {
    if (currentItem.isDirectory && currentItem.fileItems) {
      result = findContractToShow(currentItem.fileItems as FileItem[], value);
    }
    if (result && result.name === value) {
      break;
    }
    if (currentItem.name === value) {
      result = currentItem
      break;
    }
  }
  return result;
}