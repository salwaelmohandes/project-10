import React, { Component } from 'react';
import Form from "./Form";

export default class CreateCourse extends Component {
    state = {
        title:"",
        description:"",
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
            //  userId: context.authenticatedUser,
            // firstName: context.authenticatedUser,
            // lastName: context.authenticatedUser,
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
                    // submitbuttontext="Create Course"
                    elements={() => (
                        <React.Fragment>
                            <div className="grid-66">
                                <div className= "course--header">
                                    <h4 className="course--lable" style={{margin:'10px'}}>Course</h4>
                                    <div>
                                        <input 
                                            id="title" 
                                            name="title" 
                                            type="text"                              
                                            onChange={this.change} 
                                            placeholder="Course title" />
                                    </div>
                                    <p >By "{this.state.firstName} {this.state.lastName}"</p>
                                    <div className="course--description">
                                </div>
                                <div>
                                    <textarea 
                                        id="description" 
                                        name="description" 
                                        type="text"                               
                                        onChange={this.change} 
                                        placeholder="Course description" >
                                    </textarea>
                                </div>
                            </div>
                        </div>
                    </React.Fragment>
                    )}
                />
            </div>                
        </div>        
        )
    }
   
}