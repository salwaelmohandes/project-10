import React, { Component } from 'react';
import { Link } from "react-router-dom";


// Create a statful component retrieves list of courses from the REST API.
export default class Courses extends Component {    
  state = {
    courses:[]
  };

  componentDidMount() {
    const { context } = this.props;

    context.data.getCourses().then((courses) => {
      if (courses) {
        this.setState({ courses });
      }
    })
    .catch( (error) => {
      console.log(error);
      this.props.history.push("/error");
    });
  }

  //Render a list of courses and link each course to its "Course Detail" screen. 
  render() {
    const courses = this.state.courses.map( (course) => (        
      <div className="grid-33" key={course.id}>
        <Link className="course--module course--link" id={course.id} to={`/courses/${course.id}`}>
          <h4 className="course-label">Course</h4>
          <h3 className="course-title">{course.title}</h3>
        </Link>
      </div>
    ));

    return (            
      <div className="bounds">
        <h1>Welcome to the Main Page</h1>
        {courses}

        {/* Render a link to the "Create Course" screen.  */}
        <div className="grid-33">
          <Link className="course--module course--add--module"  to="/courses/create" >                    
            <h3 className="course--add--title" >+ New Course</h3>
          </Link>
        </div>
      </div>           
    );
  }
}