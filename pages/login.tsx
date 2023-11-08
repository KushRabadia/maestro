import React, { useState } from 'react';
import Router from 'next/router';
import Layout from '@/layout/layout';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { Button, Stack, Typography } from '@mui/material';
import Link from 'next/link';

interface SignInFormData {
  email: string;
  password: string;
}

const Register: React.FC = () => {
	const [formState, setFormState] = useState<SignInFormData>({
    email: '',
    password: '',
  });
	const [loading, setLoading] = useState(false);

	const handleChange = (field: keyof SignInFormData) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormState({
      ...formState,
      [field]: event.target.value,
    });
  };

	const signinHandler = async () => {
		try {
			setLoading(true);
			
			const bodyFormData = new FormData();
			bodyFormData.append('email', formState.email);
			bodyFormData.append('password', formState.password);

			const response = await fetch('http://localhost:8000/api/user/login', {
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
					throw new Error('Validation failed!');
				}
			}

			const resData = await response.json();
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
								opacity: 0.75,
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
					}}
				>
					<Stack gap={4}>
						<Typography variant="h6">Login</Typography>

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
							required
							type="password"
							onChange={handleChange('password')}
							value={formState.password}
							sx={{ borderRadius: 0, opacity: 0.5 }}
						/>

						<Button
							variant="contained"
							sx={{
								textTransform: 'none',
								fontWeight: 'bold',
								display: 'block',
								margin: '0 auto',
							}}
							type="submit"
							onClick={signinHandler}
						>
							Login
						</Button>
					</Stack>
				</Container>
			</Container>
		</Layout>
	);
};

export default Register;
