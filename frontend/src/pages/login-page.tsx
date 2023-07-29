import React, { useState } from 'react';
import { ConfirmPassword } from '../components/inputs/confirm-password';
import { Email } from '../components/inputs/email';
import { Password } from '../components/inputs/password';
import { Username } from '../components/inputs/username';
import { useLoginForm } from '../hooks/useLoginForm';
import {useNavigate } from "react-router-dom";

interface LoginProps {
	isLogin: boolean;
}
export const Login = () => {

	//const [isUserName, setIsUserName] = useState<boolean>(true);

	const {
		username,
		setUsername,
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
	
	return (
		<main className="login-main-container flex ">
			<div className="login-container f-col">
				{/* <button className="submit-btn optional-login-btn" onClick={() => setIsUserName((prev) => !prev)}>
					Login with {isUserName ? 'Userame' : 'Email'}
				</button> */}Login

				<form className="login-form" onSubmit={handleSubmit}>
				{/* <h1 className="form-title">{isUserName ? 'Login' : 'Email'}</h1> */}

					{/* {isUserName ? (
						<Username
							errors={errors}
							setUsername={setUsername}
							validateInput={validateInput}
							username={username}
						/>
					) : (
						<Email
							errors={errors}
							setEmail={setEmail}
							validateInput={validateInput}
							email={email}
						/>
					)} */}
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
					<button className="" onClick={() =>  navigate("/signup")}>
						Signup
					</button>
			</div>
		</main>
	);
};
