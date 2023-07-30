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
        <main className="login-main-container flex ">
            <div className="login-container f-col">
                <form className="login-form" onSubmit={handleSubmit}>
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
                        Login
                    </button>
                </form>
                <button className="" onClick={() => navigate("/signup")}>
                    Signup
                </button>
            </div>
        </main>
    );
};
