import React, { Component } from 'react';

// Import and use the CSS contained within the global.css file 
// in the styles project files folder for the application's styles.
import './styles/global.css';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';

// import components
import Header from './components/Header';
import Courses from './components/Courses';
import CourseDetail from './components/CourseDetail';
import CreateCourse from './components/CreateCourse';
import UpdateCourse from './components/UpdateCourse';
import DeleteCourse from './components/Delete';
import UserSignUp from './components/UserSignUp';
import UserSignIn from './components/UserSignIn';
import UserSignOut from './components/UserSignOut';

import Error from './components/Error';
import NotFound from './components/NotFound';

// New import
import withContext from './Context'; 
import PrivateRoute from './PrivateRoute';

// Connect the components to context

const HeaderWithContext = withContext(Header);

const CoursesWithContext = withContext(Courses);
const CourseDetailWithContext = withContext(CourseDetail);
const CreateCourseWithContext = withContext(CreateCourse);
const UpdateCourseWithContext = withContext(UpdateCourse);
const DeleteCourseWithContext = withContext(DeleteCourse);

const UserSignUpWithContext = withContext(UserSignUp);
const UserSignInWithContext = withContext(UserSignIn);

const UserSignOutWithContext = withContext(UserSignOut);


// Create a stateless component to wrap an instance of the <Route> component.
// Also modify the create, update and delete routes (that needs authentication) to use the PrivateRoute.

class App extends Component {
   
  render() {

    return (

      <Router>
        <div>
          <HeaderWithContext /> 
          <Switch>
            <Route exact path="/" component={CoursesWithContext} />} />
            <Route exact path="/courses" component={CoursesWithContext} /> 
            <PrivateRoute path="/courses/create" component={CreateCourseWithContext} />
            <PrivateRoute path="/courses/:id/update" component={UpdateCourseWithContext} />
            <Route exact path="/courses/:id" component={CourseDetailWithContext} />
            <PrivateRoute path="/courses/:id/delete" component={DeleteCourseWithContext} />
            <Route path="/signin" component={UserSignInWithContext} />
            <Route path="/signup" component={UserSignUpWithContext} />
            <Route path="/signout" component={UserSignOutWithContext} />
            <Route path="/error" component={Error} />
            <Route path="*" component={NotFound} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
