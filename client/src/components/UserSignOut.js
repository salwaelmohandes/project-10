import React from 'react';
import { Redirect } from 'react-router-dom';


// This stateless component signs out the authenticated user
// by removing the authenticated user and password from the global state. 
// and redirects the user to the default route.

export default ({ context }) => {
  context.actions.signOut();
    return (
    <Redirect to="/" />
  );
}