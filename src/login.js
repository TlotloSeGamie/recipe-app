import React from "react";
import axios from "axios";

const Login = ( {onFormSwitch} ) => {
    return(
        <div className="login-contaner">
            <div className="login-modal">
                    <div className="modal-content">
                        <span className="close">&times;</span>
                        <h2>Login</h2>
                        <form className="log">
                            <label htmlFor="email">Email</label>
                            <input 
                                type="text" 
                                placeholder="email"
                                name="email"
                            />
                            <label htmlFor="password">Password</label>
                            <input
                            type="password"
                            placeholder="password"
                            name="password"
                            />
                            <button type="submit">Submit</button>
                        </form>
                    </div>
                </div>
        </div>
    )
}

export default Login;