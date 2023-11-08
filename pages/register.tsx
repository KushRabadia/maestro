import React, { useState } from 'react';
import Router from 'next/router';
import Link from 'next/link';
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

	const handleChange = (field: keyof SignUpFormData) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormState({
      ...formState,
      [field]: event.target.value,
    });
  };

	const signupHandler = async () => {
		try {
			setLoading(true);

			if (formState.password !== formState.confirmPassword) {
				return;
			}

			const bodyFormData = new FormData();
			bodyFormData.append('email', formState.email);
			bodyFormData.append('password', formState.password);
			bodyFormData.append('name', formState.username);

			const response = await fetch('http://localhost:8000/api/user/create', {
				method: 'POST',
				body: bodyFormData,
			});

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
			// Assuming that `login` and `Router` are available in your context
			// Update this part based on your actual implementation
			// this.props.dispatch(login(resData.user));
			localStorage.setItem('token', resData.token);
			const remainingMilliseconds = 60 * 60 * 1000;
			const expiryDate = new Date(new Date().getTime() + remainingMilliseconds);
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
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'row',
						position: 'relative',
						marginTop: 10,
						justifyContent: 'center',
						maxWidth: 'auto',
						fontSize: 20,
						gap: 5,
					}}
				>
					<Link href="/login">
						<Button
							sx={{
								fontSize: 20,
								textTransform: 'none',
								fontWeight: 'bold',
								opacity: 0.75,
							}}
						>
							Login
						</Button>
					</Link>
					<Link href="/register">
						<Button
							sx={{
								fontSize: 20,
								textTransform: 'none',
								fontWeight: 'bold',
							}}
						>
							Register
						</Button>
					</Link>
				</Box>

				<Container
					maxWidth="sm"
					sx={{
						marginTop: 5,
						boxShadow: 3,
						borderRadius: 5,
						padding: 5,
						display: 'flex',
						flexDirection: 'column',
					}}
				>
					<Stack gap={4}>
						<Typography variant="h6">Create Your Account</Typography>
						<TextField
							id="standard-basic"
							label="Username..."
							variant="outlined"
							required
							onChange={handleChange('username')}
							value={formState.username}
							sx={{ borderRadius: 0, opacity: 0.5 }}
						/>
						<TextField
							id="standard-basic"
							label="Email Address..."
							variant="outlined"
							required
							type="email"
							onChange={handleChange('email')}
							value={formState.email}
							sx={{ borderRadius: 0, opacity: 0.5 }}
						/>
						<TextField
							id="standard-basic"
							label="Password..."
							variant="outlined"
							type="password"
							required
							onChange={handleChange('password')}
							value={formState.password}
							sx={{ borderRadius: 0, opacity: 0.5 }}
						/>
						<TextField
							id="standard-basic"
							label="Confirm Password..."
							variant="outlined"
							type="password"
							required
							onChange={handleChange('confirmPassword')}
							value={formState.confirmPassword}
							sx={{ borderRadius: 0, opacity: 0.5 }}
						/>
					</Stack>

					<Button
						variant="contained"
						sx={{
							textTransform: 'none',
							fontWeight: 'bold',
							display: 'block',
							margin: '0 auto',
						}}
						type="submit"
						onClick={signupHandler}
					>
						Register
					</Button>
				</Container>
			</Container>
		</Layout>
	);
};

export default Register;
