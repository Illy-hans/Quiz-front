import { useState } from "react";
import { login, signUp } from "../../services/authentication";
import { Link } from "react-router-dom";


const SignUpComponent = () =>  {

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [signUpError, setError] = useState("");


    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
        event.preventDefault();
        try {
            await signUp(username, email, password)
            const data = await login(email, password);
            window.localStorage.setItem("token", data.token);
            window.localStorage.setItem("user_id", data.user_id);

        } catch (error) {
            console.error(error);
            setError(error.cause)
            }
    };

    const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        console.log(event.target.value)
        setUsername(event.target.value);
    };

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        console.log(event.target.value)
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        console.log(event.target.value)
        setPassword(event.target.value);
    };


    return (

        <>
            <div className="signup-box">
        
                {/* TITLE */}
                <h2>Create Account</h2>
        
                {/* FORM */}
                <form className="content-signup" action='/upload' encType="multipart/form-data" onSubmit={handleSubmit}>
        
                {/* USERNAME FORM */}
                {/* <label htmlFor="username">Username:</label> */}
                    <input
                    className="input"
                    placeholder="Username"
                    id="username"
                    type="text"
                    // value={username}
                    onChange={handleUsernameChange}
                    required />
        
                    {/* EMAIL FORM */}
                    {/* <label htmlFor="email">Email:</label> */}
                    <input
                    className="input"
                    placeholder="Email"
                    id="email"
                    type="email"
                    pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$"
                    // value={email}
                    onChange={handleEmailChange}
                    required />
        
                    {/* ERROR */}
                    {signUpError && <div className="invalid-signup" role="invalid-signup">{signUpError}</div>}
        
                    {/* PASSWORD FORM */}
                    {/* <label htmlFor="password">Password:</label> */}
                    <input
                    className="input"
                    placeholder="A strong password"
                    id="password"
                    type="password"
                    // minLength="8"
                    // pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                    title="Must contain at least one number, one uppercase and lowercase letter, and at least 8 or more characters"
                    // value={password}
                    onChange={handlePasswordChange}
                    required />
        
        
                    {/* BUTTON SUBMIT */}
                    <input className="btn" role="submit-button" id="submit" type="submit" value="Create!" />
        
                </form>
        
            </div>
            </>
        
        );

};


export default SignUpComponent;