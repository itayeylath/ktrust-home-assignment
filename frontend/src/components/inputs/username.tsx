interface UsernameProps {
    errors: any;
    setUsername: (name: string) => void;
    validateInput: (name: string, value: string) => void;
    username: string;
}
export const Username = ({
    errors,
    setUsername,
    validateInput,
    username,
}: UsernameProps) => {
    return (
        <>
            <div>
            <h3 className="header3-container"> USERNAME</h3>
            <div className="email-container">
                <label className="email-lable" htmlFor="username">
                <input
                    className={"password-input"}
                    type="text"
                    id="username"
                    name="username"
                    value={username}
                    onChange={(e: any) => setUsername(e.target.value)}
                    onBlur={(e: any) =>
                        validateInput("username", e.target.value)
                    }
                />
                </label>
                {errors.username && (
                    <span className="username-error-message">{errors.username}</span>
                )}
                </div>
            </div>
        </>
    );
};
