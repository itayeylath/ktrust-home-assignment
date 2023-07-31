import React from "react";

interface EmailProps {
    errors: any;
    setEmail: (email: string) => void;
    validateInput: (name: string, value: string) => void;
    email: string;
}

export const Email = ({
    errors,
    setEmail,
    validateInput,
    email,
}: EmailProps) => {
    return (
        <>
            <div>
                <h3 className="header3-container"> EMAIL</h3>
                <div className="email-container">
                    <label className="email-lable" htmlFor="email">
                        <input
                            className={"email-input"}
                            type="email"
                            id="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            onBlur={(e) =>
                                validateInput("email", e.target.value)
                            }
                        />
                    </label>
                    {errors.email && (
                        <span className="error-message">{errors.email}</span>
                    )}
                </div>
            </div>
        </>
    );
};
