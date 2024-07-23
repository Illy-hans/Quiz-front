import { useState } from "react";
import { login } from "../../services/authentication";
import { Link, useNavigate } from "react-router-dom";


const LoginComponent = () =>  {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loginError, setError] = useState("");
    const navigate = useNavigate();


    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
        event.preventDefault();
        try {
            const data = await login(email, password);
            window.localStorage.setItem("token", data.token);
            window.localStorage.setItem("user_id", data.user_id);
            navigate('/quiz')

        } catch (error) {
            console.error(error);
            setError(error.cause)
            }
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

        <div className="login-box">
            {/* TITULO */}
            <h2>Login</h2>

            {/* FORMS */}
            <form className="content-login" onSubmit={handleSubmit}>

            {/* FORM EMAIL */}
            {/* <label htmlFor="email">Email:</label> */}
            <input className="input" placeholder="Email" id="email" type="text" value={email} onChange={handleEmailChange}/>

            {/* FORM PASSWORD */}
            {/* <label htmlFor="password">Password:</label> */}
            <input className="input" placeholder="Password"  id="password" type="password"  value={password} onChange={handlePasswordChange}/>
            
            {/* ERROR */}
            {loginError && <div className="invalid-signup" role="invalid-signup">{loginError} </div>}

            {/* Button SUBMIT */}
            <input className="btn btn-login" role="submit-button" id="submit" type="submit" value="Login" />

            </form>
        

            {/* Buttor SIGNUP
            <button className="btn btn-signup">
                    <Link to="/signup" className="btn">Create new account</Link>
            </button>
             */}

        </div>    

        

        </>

    );

};


export default LoginComponent;