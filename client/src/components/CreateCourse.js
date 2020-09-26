import React, { Component } from 'react';
import Form from "./Form";

// Component renders a form allowing a user to create a new course 
// by sending a POST request to the REST API route when clicking the button.
export default class CreateCourse extends Component {
    state = {
        title:"",
        description:"",
        estimatedTime:"",
        materialsNeeded:"",
        userId:"",
        firstName:"",
        lastName:"",
        emailAddress:"",
        password:"",
        errors:[]
    }
    componentDidMount() {
        const { context } = this.props;
        this.setState(() => {
            return {
            userId: context.authenticatedUser.id,
            firstName: context.authenticatedUser.firstName,
            lastName: context.authenticatedUser.lastName,            
            }
        });
    };
    render() {
        const { errors } = this.state;

        return (                  
            <div className= "bounds"> 
            <h1>Create Course</h1>                   
                <div>
                    <Form cancel={this.cancel}
                        errors={errors}
                        submit={this.submit}
                        submitButtonText="Create Course"
                        elements={() => (
                            <React.Fragment>
                                <div className="grid-66">
                                    <div className= "course--header">
                                        <h4 className="course--lable">Course</h4>
                                        <div>
                                            <input 
                                                id="title" 
                                                name="title" 
                                                type="text"                              
                                                onChange={this.change} 
                                                className="input-title course--title--input" 
                                                placeholder="Course title..." 
                                            />
                                        </div>
                                        <p >By "{this.state.firstName} {this.state.lastName}"</p>
                                    </div>
                                    <div className= "course--description">
                                        <textarea 
                                            id="description" 
                                            name="description" 
                                            type="text"                               
                                            onChange={this.change} 
                                            placeholder="Course description..." >
                                        </textarea>
                                    </div>
                                </div>
                                <div className="grid-25 grid-right">
                                    <div className="course--stats">
                                        <ul className="course--stats--list">
                                            <li className="course--stats--list--item">
                                                <h4>Estimated Time</h4>
                                                <div>
                                                    <input 
                                                        id="estimatedTime" 
                                                        name="estimatedTime" 
                                                        type="text" 
                                                        className="course--time--input"
                                                        placeholder="Hours" 
                                                        onChange={this.change} 
                                                    />
                                                </div>
                                            </li>
                                            <li className="course--stats--list--item">
                                                <h4>Materials Needed</h4>
                                                <div>
                                                    <textarea 
                                                        onChange={this.change} 
                                                        id="materialsNeeded" 
                                                        name="materialsNeeded" 
                                                        placeholder="List materials...">
                                                    </textarea>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </React.Fragment>
                        )}
                    />
                </div>                
            </div>        
        )
    }

    change = (e) => {
        const name = e.target.name
        const value = e.target.value
        this.setState({
           [name] : value  
        })
    }

    submit = () => {
            const { context } = this.props;
            const { userId, title, description, estimatedTime, materialsNeeded, errors } = this.state;
            const course = { userId, title, description, estimatedTime, materialsNeeded, errors };
            const emailAddress  = context.authenticatedUser.emailAddress;
            const password = context.authenticatedUser.password;

            context.data.createCourse(emailAddress, password, course ).then((errors) => {
                console.log(errors)
            if (errors.length) {
              this.setState({ errors });
            }else {
                console.log("course created")
                this.props.history.push('/courses');
                }
            }).catch( (error) => {
            console.log(error);
            this.props.history.push("/error");
        });
    }

    // "Cancel" button that returns the user to the default route.
    
    cancel = () => {
        this.props.history.push('/')
    }
}