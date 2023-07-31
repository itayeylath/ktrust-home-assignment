import React from "react";

interface ConfirmPasswordProps {
    errors: any;
    setConfirmPassword: (password: string) => void;
    validateInput: (name: string, value: string) => void;
    confirmPassword: string;
}

export const ConfirmPassword = ({
    errors,
    setConfirmPassword,
    validateInput,
    confirmPassword,
}: ConfirmPasswordProps) => {
    return (
        <>
            <div>
            <h3 className="header3-container"> REPEAT</h3>
            <div className="email-container">
                <label className="email-lable" htmlFor="confirm-password">
                <input
                    className={"password-input"}
                    type="password"
                    id="confirm-password"
                    name="confirm-password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    onBlur={(e) =>
                        validateInput("confirmPassword", e.target.value)
                    }
                    required
                />
                </label>
                {errors.confirmPassword && (
                    <p className="username-error-message">{errors.confirmPassword}</p>
                )}
                
                </div>
            </div>
        </>
    );
};
