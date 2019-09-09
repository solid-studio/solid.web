import * as React from 'react'
import { Link } from 'react-router-dom'

export const NotFoundView = () => (
  <div
    data-testid="not-found-view"
    style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%'
    }}>
    <h1 style={{ fontSize: '4rem' }}>
      Page Not Found
    </h1>
    <p>The page you are looking for, doesn't exist. Please try to</p>
    <Link to="/">Return to Home Page</Link>
  </div>
)
