import { useEffect } from "react";
import { Email } from "../components/inputs/email";
import { Password } from "../components/inputs/password";
import { useLoginForm } from "../hooks/useLoginForm";
import { useNavigate } from "react-router-dom";

export const Login = () => {
    const {
        password,
        setPassword,
        email,
        setEmail,
        errors,
        handleSubmit,
        validateInput,
        confirmPassword,
        setConfirmPassword,
    } = useLoginForm({ isLogin: true });

    const navigate = useNavigate();

    useEffect(() => {
        let token = localStorage.getItem("myToken");

        if (token) {
            navigate("/home");
        }
    }, []);

    return (
        <main className="login-main-container">
            <div className="login-container f-col">
            <h1 className="header1-container">WELCOME</h1>
            <h2 className="header2-container">LOG IN</h2>
            {/* className="login-form" */}
                <form  className="form-container" onSubmit={handleSubmit}>
                    <Email
                        errors={errors}
                        setEmail={setEmail}
                        validateInput={validateInput}
                        email={email}
                    />

                    <Password
                        errors={errors}
                        setPassword={setPassword}
                        validateInput={validateInput}
                        password={password}
                    />

                    <button className="form-button submit-btn" type="submit">
                        
                        LET'S GO!
                    </button>
                </form>
                <button className="form-button submit-btn-signup" onClick={() => navigate("/signup")}>
                Don’t have an account? Signup
                </button>
            </div>
        </main>
    );
};
