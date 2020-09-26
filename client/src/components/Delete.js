import React, { Component } from "react";


export default class DeleteCourse extends Component {
    state= {
        course: {},
        title: ""
    };

    componentDidMount() {
        const { context } = this.props; 
        const { id } = this.props.match.params;
    
        context.data.getCourseDetails(id)
          .then((response) => {
            if (response) {
              this.setState({
                course: response.course,
                emailAddress: context.authenticatedUser.emailAddress,
                password: context.authenticatedUser.password,
              });
            } else {
              this.props.history.push("/notfound");
            }
          })
        .catch((error) => {
          console.log(error);
          this.props.history.push("/courses");
        });
    }

    render() {
        const { course } = this.state;

        return (
            <React.Fragment>                             
                <div className= "bounds course--delete">
                    <h1>Delete Course</h1> 
                    <h3>Are you sure you want to delete this course: {course.title}?</h3>
                    <button className="button" type="submit" onClick={this.delete} >Delete Course</button>
                    <button className="button" type="cancel" onClick={this.cancel}>Cancel</button>
                </div>
            </React.Fragment>              
        )
    }

    delete = () => {
        const { context } = this.props;
        const { course, emailAddress, password } = this.state;
       
        context.data.deleteCourse( course.id, emailAddress, password ).then((errors) => {
        if (errors.length) {
        console.log(errors);
        }else {
            this.props.history.push("/");
            }
        }).catch( (error) => {
        console.log(error);
        this.props.history.push("/");
        });
    }

    cancel = () => {
        this.props.history.push("/")
    }   
}

