import React from 'react';
import { Link } from 'react-router-dom';


// Create a Header stateless component renders the top menu bar and links 
// -for signing in and signing up 
//  (if there's not an authenticated user) 
// -or the user's first and last name and a button for signing out 
//  (if there's an authenticated user).

export default (props) => {

  const { context } = props;
  const authUser = context.authenticatedUser;

  return (
    <div className="header">
      <div className="grid-100">
      </div>
      <div className="bounds">
        <Link to="/">
          <h1 className="header--logo">Courses</h1>
        </Link>
        <nav>
          {authUser ? (          
            <React.Fragment>
              <span>Welcome, {authUser.firstName} {authUser.lastName}!</span>
              <Link className="signout" to="/signout">Sign Out</Link>
            </React.Fragment>
          ):(
            <React.Fragment>
              <Link className="signup" to="/signup">Sign Up</Link>
              <Link className="signin" to="/signin">Sign In</Link>
            </React.Fragment>
          )}
        </nav>
      </div>
    </div>
  );
}