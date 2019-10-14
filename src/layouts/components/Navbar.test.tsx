
import React from 'react';
import { render, fireEvent, wait } from '@testing-library/react';

import { Navbar } from './Navbar'

describe('Navbar', () => {

  const onNewConnectionClickMock = jest.fn()
  const onNewContractInstanceClickMock = jest.fn()

  beforeEach(() => {
    onNewConnectionClickMock.mockClear()
    onNewContractInstanceClickMock.mockClear()
  })

  test('navbar ui items are rendered', () => {
    const { getByTestId, getByText } = render(
      
      <Navbar onNewConnectionClick={onNewConnectionClickMock}
        onNewContractInstanceClick={onNewContractInstanceClickMock}/>)

    const newButton = getByTestId('button-navbar-new')
    const title = getByText(/solid/i)

    expect(newButton).toHaveAttribute('type', 'button')
    expect(newButton).toBeInTheDocument()
    expect(title).toBeInTheDocument()
  })

  test('when new connection button is clicked, onNewConnectionClick is called', () => {
    const { getByTestId } = render(
      
      <Navbar onNewConnectionClick={onNewConnectionClickMock}
        onNewContractInstanceClick={onNewContractInstanceClickMock}/>)

    const newButton = getByTestId('button-navbar-new')
    fireEvent.click(newButton)

    expect(onNewConnectionClickMock).toHaveBeenCalled()
    expect(onNewConnectionClickMock).toHaveBeenCalledTimes(1)
  })


  test('when new connection from dropdown is clicked, onNewConnectionClick is called', async () => {
    const { getByTestId } = render(
      
      <Navbar onNewConnectionClick={onNewConnectionClickMock}
        onNewContractInstanceClick={onNewContractInstanceClickMock}/>)

    const dropdownButton = getByTestId('navbar-menu')
    fireEvent.mouseOver(dropdownButton)

    await wait(() => {
      expect(getByTestId('navbar-menu-contract')).toBeInTheDOM()
      expect(getByTestId('navbar-menu-connection')).toBeInTheDOM()
    })

    const connectionOptionInDropdown = getByTestId('navbar-menu-connection')
    fireEvent.click(connectionOptionInDropdown)

    expect(onNewConnectionClickMock).toHaveBeenCalled()
    expect(onNewConnectionClickMock).toHaveBeenCalledTimes(1)
  })


  test('when new contract instance button is clicked, onNewContractInstanceClick is called', async () => {
    const { getByTestId } = render(
      
      <Navbar onNewConnectionClick={onNewConnectionClickMock}
        onNewContractInstanceClick={onNewContractInstanceClickMock}/>)

    const dropdownButton = getByTestId('navbar-menu')
    fireEvent.mouseOver(dropdownButton)

    await wait(() => {
      expect(getByTestId('navbar-menu-contract')).toBeInTheDOM()
      expect(getByTestId('navbar-menu-connection')).toBeInTheDOM()
    })

    const contractOptionInDropdown = getByTestId('navbar-menu-contract')
    fireEvent.click(contractOptionInDropdown)

    expect(onNewContractInstanceClickMock).toHaveBeenCalled()
    expect(onNewContractInstanceClickMock).toHaveBeenCalledTimes(1)
  })

  test('renders navbar snapshot', async () => {

    const { getByTestId, baseElement } = render(
      
      <Navbar onNewConnectionClick={onNewConnectionClickMock}
        onNewContractInstanceClick={onNewContractInstanceClickMock}/>)

    const dropdownButton = getByTestId('navbar-menu')
    fireEvent.mouseOver(dropdownButton)

    await wait(() => {
      expect(getByTestId('navbar-menu-contract')).toBeInTheDOM()
      expect(getByTestId('navbar-menu-connection')).toBeInTheDOM()
    })

    expect(baseElement.innerHTML).toMatchSnapshot()
  })
})
