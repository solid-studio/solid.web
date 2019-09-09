import React from 'react'
import { render, fireEvent, waitForElement } from '@testing-library/react';
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import '@testing-library/jest-dom/extend-expect';

import { MainRoutes } from './routes'

describe('Routes', () => {

  const renderRoutes = (history) => {
    return render(
      <Router history={history}>
        <MainRoutes />
      </Router>
    )
  }

  it('should render HOME VIEW', () => {
    const history = createMemoryHistory({
      initialEntries: ['/']
    })
    const { getByTestId } = renderRoutes(history)

    expect(getByTestId('home-view')).toBeInTheDocument()
  })

  it('should render NOT FOUND VIEW', () => {
    const history = createMemoryHistory({
      initialEntries: ['/']
    })

    const { getByTestId } = renderRoutes(history)

    expect(getByTestId('home-view')).not.toBeInTheDocument()
    expect(getByTestId('not-found-view')).toBeInTheDocument()
  })
})