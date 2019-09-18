import React from 'react'
import { Route, Switch, RouteProps } from 'react-router-dom'

import { MainContentView, NotFoundView } from './views'
import { DefaultLayout } from './layouts'

interface Props extends RouteProps {
  component: new (props: any) => React.Component
}

const DashboardRoute = ({ component: Component, ...rest }: Props) => {
  return (
    <Route
      {...rest}
      render={matchProps => (
        <DefaultLayout {...rest}>
          <Component {...matchProps} />
        </DefaultLayout>
      )}
    />
  )
}

export const MainRoutes = () => (
  <Switch>
    <DashboardRoute path="/" exact={true} component={MainContentView} />
    <Route component={NotFoundView} />
  </Switch>
)

export default MainRoutes
