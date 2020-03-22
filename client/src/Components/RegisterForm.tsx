import React from "react";

let name: string = "";
let email: string = "";
let password: string = "";

export default class RegisterForm extends React.Component {

    render (){
        return (
            <form action="POST" onSubmit={this.handleSubmission}>
                <label>
                    Name: <input type="text" onChange={event => name = event.target.value} />
                </label>
                <label>
                    E-mail: <input type="text" onChange={event => email = event.target.value} />
                </label>
                <label>
                    Password: <input type="password" onChange={event => password = event.target.value} />
                </label>
                <input type="submit" value="submit" />
            </form>
        );
    }

    handleSubmission(event: any) {
        event.preventDefault();
        console.log(name);
    }
}