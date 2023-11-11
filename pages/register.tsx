import React, { useState } from 'react';
import Router from 'next/router';
import Link from 'next/link';
import validator from 'validator';
import Layout from '@/layout/layout';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { Button, Stack, Typography } from '@mui/material';

interface SignUpFormData {
	username: string;
	email: string;
	password: string;
	confirmPassword: string;
}

const Register: React.FC = () => {
	const [formState, setFormState] = useState<SignUpFormData>({
		username: '',
		email: '',
		password: '',
		confirmPassword: '',
	});
	const [loading, setLoading] = useState(false);

	const [usernameError, setUsernameError] = useState<boolean>(false);
	const [usernameErrorMsg, setUsernameErrorMsg] = useState<string>("");
	
	const [emailError, setEmailError] = useState<boolean>(false);
	const [emailErrorMsg, setEmailErrorMsg] = useState<string>("");

	const [passwordError, setPasswordError] = useState<boolean>(false);
	const [passwordErrorMsg, setPasswordErrorMsg] = useState<string>("");

	const [confirmPasswordError, setConfirmPasswordError] = useState<boolean>(false);
	const [confirmPasswordErrorMsg, setConfirmPasswordErrorMsg] = useState<string>("");

	const handleChange =
		(field: keyof SignUpFormData) =>
		(event: React.ChangeEvent<HTMLInputElement>) => {
			const value = event.target.value;

			setFormState({
				...formState,
				[field]: value,
			});

		
			if (field == 'username') {
				if (value.trim() == "") {
					setUsernameError(true);
					setUsernameErrorMsg("Please enter username");
				} else {
					setUsernameError(false);
					setUsernameErrorMsg("");
				}
			}
			if (field == 'email') {
				if (value.trim() == "") {
					setEmailError(true);
					setEmailErrorMsg("please enter an email");
				} else {
					setEmailError(false);
					setEmailErrorMsg("");
				}

				if (validator.isEmail(value)) {
					setEmailError(false);
					setEmailErrorMsg("");
				} else {
					setEmailError(true);
					setEmailErrorMsg("please enter a valid email");
				}
			}
			if (field == 'password') {
				if (value.length < 7) {
					setPasswordError(true);
					setPasswordErrorMsg("Use 6 characters or longer.");
				} else {
					setPasswordError(false);
					setPasswordErrorMsg("");
				}
			}

			if ((field == 'confirmPassword' && value != formState.password) || (field == 'password' && value != formState.confirmPassword)) {
				setConfirmPasswordError(true);
				setConfirmPasswordErrorMsg("Passwords do not match.");
			}
			if ((field == 'confirmPassword' && value == formState.password) || (field == 'password' && value == formState.confirmPassword)) {
				setConfirmPasswordError(false);
				setConfirmPasswordErrorMsg("");
			}
	};
	
	const checkFormValidity = (): boolean => {
		let validity = true;
		if (formState.username.trim() == "") {
			setUsernameError(true);
			setUsernameErrorMsg("Please enter username");
			validity = false;
		}
		if (formState.email.trim() == "") {
			setEmailError(true);
			setEmailErrorMsg("Please enter email");
			validity = false;
		}
		if (formState.password.trim() == "") {
			setPasswordError(true);
			setPasswordErrorMsg("Please enter password");
			validity = false;
		}
		if (formState.confirmPassword.trim() == "") {
			setConfirmPasswordError(true);
			setConfirmPasswordErrorMsg("Please enter confirmPassword");
			validity = false;
		}
		return validity;
	}
			
	const signupHandler = async () => {
		try {
			setLoading(true);
			if ((usernameError || emailError || passwordError || confirmPasswordError || !checkFormValidity())) {
				return;
			}

			const bodyFormData = new FormData();
			bodyFormData.append('email', formState.email);
			bodyFormData.append('password', formState.password);
			bodyFormData.append('name', formState.username);

			const response = await fetch(
				'http://localhost:8000/api/user/create',
				{
					method: 'POST',
					body: bodyFormData,
				}
			);

			if (!response.ok) {
				const resData = await response.json();
				if (response.status === 401 || response.status === 422) {
					console.log(resData.message);
					throw new Error('Validation failed.');
				} else {
					console.log('Error!');
					throw new Error('Creating a user failed!');
				}
			}

			const resData = await response.json();
			localStorage.setItem('token', resData.token);
			const remainingMilliseconds = 60 * 60 * 1000;
			const expiryDate = new Date(
				new Date().getTime() + remainingMilliseconds
			);
			localStorage.setItem('expiryDate', expiryDate.toISOString());
			Router.push('/home');
		} catch (err) {
			console.error(err);
		} finally {
			setLoading(false);
		}
	};

	return (
		<Layout>
			<Container maxWidth="sm">
				<Box className={'register_boxLayout'}>
					<Link href="/login">
						<Button
							className={'register_pageButton'}
							sx={{
								opacity: 0.5,
							}}
						>
							Login
						</Button>
					</Link>
					<Link href="/register">
						<Button className={'register_pageButton'}>
							Register
						</Button>
					</Link>
				</Box>

				<Container maxWidth="sm" className="register_containerLayout">
					<Stack gap={4}>
						<Typography variant="h6">
							Create Your Account
						</Typography>
						<TextField
							error={usernameError}
							helperText={usernameErrorMsg}
							id="username"
							label="Username"
							variant="outlined"
							required
							className="register_textField"
							onChange={handleChange('username')}
							value={formState.username}
						/>
						<TextField
							error={emailError}
							helperText={emailErrorMsg}
							id="email"
							label="Email Address"
							variant="outlined"
							required
							className="register_textField"
							type="email"
							onChange={handleChange('email')}
							value={formState.email}
						/>
						<TextField
							error={passwordError}
							helperText={passwordErrorMsg}
							id="password"
							label="Password"
							variant="outlined"
							type="password"
							required
							className="register_textField"
							onChange={handleChange('password')}
							value={formState.password}
						/>
						<TextField
							error={confirmPasswordError}
							helperText={confirmPasswordErrorMsg}
							id="confirm-password"
							label="Confirm Password"
							variant="outlined"
							type="password"
							required
							className="register_textField"
							onChange={handleChange('confirmPassword')}
							value={formState.confirmPassword}
						/>
						<Button
							variant="contained"
							className="register_dataButton"
							type="submit"
							onClick={signupHandler}
						>
							Register
						</Button>
					</Stack>
				</Container>
			</Container>
		</Layout>
	);
};

export default Register;
