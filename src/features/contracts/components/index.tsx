import styled from 'styled-components'

import { Tree, Menu } from 'antd'

const DirectoryTree = Tree.DirectoryTree
const TreeNode = Tree.TreeNode
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
    justify-content: space-between;
    .ant-upload-list {
        width : 100%;
        display: block;
        position: absolute;
        left: 0;
        max-width: 280px;
    }
    .ant-upload-list-item-info {
        width: 280px;
    }
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
    color: white;
`
