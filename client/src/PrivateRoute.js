import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Consumer } from './Context';

// Define a higher-order component (HOC) named PrivateRoute 
// for configuring protected routes (i.e. routes that require authentication).

export default ({ component: Component, ...rest }) => {
  return (
    <Consumer>
      { (context) => (
        <Route
          {...rest}
            render={props => context.authenticatedUser ? (
              <Component {...props} />
                ) : (
              <Redirect to={{
                  pathname: '/signin',
                  state: { from: props.location },
                }} 
              />              
            )
          }
        />
      )}
    </Consumer>
  );
};