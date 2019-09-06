
import React from 'react';
import { Formik, Field, FormikErrors } from 'formik';
import { render, fireEvent, waitForElement } from '@testing-library/react';
// import { axe } from 'jest-axe'

import Default from './Default';

const when = describe

describe('Dashboard/Default Page', async () => {

  const onNewConnectionClickMock = jest.fn()
  const onNewContractInstanceClickMock = jest.fn()

  beforeEach(() => {
    onNewConnectionClickMock.mockClear()
    onNewContractInstanceClickMock.mockClear()
  })

  // I click new connection
  // the modal should be open
  // I type name
  // I type url
  // I click submit
  // it should be sent
  // -- either save connection in the component was called
  // -- or the action was called
  // -- or should I mock axios?

  test.only('when new connection button is clicked, the modal opens', () => {
    const { getByTestId, debug } = render(
      <Default>
      </Default>)

    debug()

    // expect(getByTestId(``)).toBeInTheDocument()
    // validate attribute or something hidden

    // trigger click

    // do I need to mock any implementation?

    expect(getByTestId(``)).toBeInTheDocument()
    // validate attribute or something hidden
  })

  test('creating a new connection', () => {
    const { getByTestId, debug } = render(
      <Navbar onNewConnectionClick={onNewConnectionClickMock}
        onNewContractInstanceClick={onNewContractInstanceClickMock}>
      </Navbar>)

    const inputName = getByTestId('')
    const inputUrl = getByTestId('')
    const submitButton = getByTestId('')

    const nameValue = 'new connection'
    const urlValue = 'new url'

    fireEvent.change(inputName, {
      target: {
        value: nameValue
      }
    })

    fireEvent.change(inputUrl, {
      target: {
        value: urlValue
      }
    })

    debug()

    fireEvent.submit(submitButton)
  })

  // TEST CASES




  // I open modal in edit mode   TODO: how does it enters to edit mode?
  // I should check that the values are there 
  // I can modify
  // I should be able to submit

  // I open modal in edit mode   TODO: how does it enters to edit mode?
  // I should check that the values are there 
  // I should be able to submit

  // I open modal in edit mode   TODO: how does it enters to edit mode?
  // I remove values
  // I shouldn't be able to submit
  // validations should be triggered
  // required message should be shown

  // I open modal in edit mode   TODO: how does it enters to edit mode?
  // I click cancel
  // modal should be hidden

  // click new connection
  // click cancel
  // modal should be hidden

  // click new connection
  // fill values
  // cancel
  // click new connection
  // values should be cleared

  // click new connection
  // cancel
  // click new connection
  // values should be cleared
})
