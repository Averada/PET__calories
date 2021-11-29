import React from 'react'
import { useSelector } from 'react-redux'
import { Redirect, Route } from 'react-router'

export default function PrivatRouter({ component: Component, ...rest }) {
  const isSignedIn = useSelector((state) => state.auth.isSignedIn);

  return (
    <Route {...rest}
    render={props => (
      isSignedIn ? <Component {...props} /> : <Redirect to='/welcomepage' />
    )}>
    </Route>
  )
}
