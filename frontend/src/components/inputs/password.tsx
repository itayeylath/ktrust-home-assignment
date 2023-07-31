import React from "react";

interface PasswordProps {
    errors: any;
    setPassword: (password: string) => void;
    validateInput: (name: string, value: string) => void;
    password: string;
}

export const Password = ({
    errors,
    setPassword,
    validateInput,
    password,
}: PasswordProps) => {
    return (
        <>
            <div>
                <h3 className="header3-container"> PASSWORD</h3>
                <div className="email-container">
                    <label className="email-lable" htmlFor="password">
                        <input
                            className={"password-input"}
                            type="password"
                            id="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            onBlur={(e) =>
                                validateInput("password", e.target.value)
                            }
                        />
                    </label>
                    {errors.password && (
                        <span className="pass-error-message">{errors.password}</span>
                    )}
                </div>
            </div>
        </>
    );
};
