import React from 'react'

import { Action, ActionCreator } from 'redux'

import { Button, Dropdown, Icon, Menu } from 'antd'
import styled, { css } from 'styled-components'

const ButtonGroup = Button.Group

const Wrapper = styled.header`
  grid-area: header;
  background-color: #272727;
  display: flex;
  color: white;
  align-items: center;
  padding-left: 1em;
  padding-right: 1em;
  display: grid;
  grid-template-columns: 16em auto 16em;
  grid-template-areas: 'leftbutton title rightbutton';
`

const ButtonRightArea = styled.div`
  grid-column-start: 1;
  grid-column-end: 3;
  grid-area: leftbutton;
  display: flex;
  justify-content: flex-start;
`

const ButtonGroupItem = styled(ButtonGroup)`
  padding-right: 1em;
`

const SmallButton = styled(Button)`
  height: 26px !important;
  padding: 0 6px !important;
`

const styles = css`
  font-weight: 100;
  font-size: 1.2em;
  color: white;
  font-family: 'Helvetica'
  grid-area: title;
  grid-column-start: 2;
  grid-column-end: 3;
  justify-self: center;
`

const NavbarTitle = styled(({ children, reverse, palette, theme, ...props }) =>
  React.createElement(`h1`, props, children)
)`
  ${styles}
`

interface Props {
  onNewConnectionClick: ActionCreator<Action>
  onNewContractDefinitionClick: ActionCreator<Action>
}

export const Navbar: React.FC<Props> = ({ onNewConnectionClick, onNewContractDefinitionClick }: Props) => {
  const onDropDownClickk = ({ key }: any) => {
    if (key === 'contract') {
      onNewContractDefinitionClick()
    } else if (key === 'connection') {
      onNewConnectionClick()
    }
  }

  const renderMenu = () => {
    return (
      <Menu onClick={onDropDownClickk}>
        <Menu.Item data-testid="navbar-menu-contract" key="contract">Contract Definition</Menu.Item>
        <Menu.Item data-testid="navbar-menu-connection" key="connection">Connection</Menu.Item>
      </Menu>
    )
  }

  return (
    <Wrapper>
      <ButtonRightArea>
        <ButtonGroupItem>
          <SmallButton data-testid={`button-navbar-new`} type="primary" size="small" onClick={onNewConnectionClick}>
            <Icon type="plus" />
            New
          </SmallButton>
          <Dropdown overlay={renderMenu}>
            <SmallButton data-testid={`navbar-menu`} type="primary" size="small">
              <Icon type="down" />
            </SmallButton>
          </Dropdown>
        </ButtonGroupItem>
        {/* <ButtonGroupItem>
          <SmallButton type="primary" size="small">
            <Icon type="fall" />
            Profiler
          </SmallButton>
        </ButtonGroupItem> */}
      </ButtonRightArea>
      <NavbarTitle>Solid Studio 1.0</NavbarTitle>
    </Wrapper>
  )
}
