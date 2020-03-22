import React from "react";

interface Props {}

interface State {
    username: string,
    password: string
}

let username: string = "";
let password: string = "";

export default class LoginForm extends React.Component {
    // username: string = "";
    // password: string = "";

    render (){
        return (
            <form action="POST" onSubmit={this.handleSubmission}>
                <label>
                    Username: <input type="text" onChange={event => username = event.target.value} />
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
        console.log(username);
    }
}