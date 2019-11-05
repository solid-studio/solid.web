import styled from 'styled-components'

import { Tree, Menu } from 'antd'

const { TreeNode } = Tree

const DirectoryTree = Tree.DirectoryTree
const MenuItem = Menu.Item

export const SidebarHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const SidebarTitle = styled.h3`
  color: white;
  font-weight: 100;
  padding: 0;
  margin: 0;
  font-size: 1em;
`

export const SidebarHeaderButtons = styled.div`
  display: flex;
`

export const TreeNodeStyled = styled(TreeNode)`
  span {
    color: white;
  }
  .;
`

export const MenuStyled = styled(Menu)`
  z-index: 1000;
  border: none !important;
`
export const MenuItemStyled = styled(MenuItem)`
  height: 2em !important;
  line-height: 2em !important;
  margin-top: 0 !important;
  margin-bottom: 0 !important;

  &:hover {
    background: #25b864;
    color: white;
  }
`

export const DirectoryTreeStyled = styled(DirectoryTree)`
  overflow: 'auto';
`