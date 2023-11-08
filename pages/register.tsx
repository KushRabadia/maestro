import Layout from '@/layout/layout';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { Button, Stack, Typography } from '@mui/material';
import Link from 'next/link';

const Register: React.FC = () => {
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
							id="standard-basic"
							label="Username"
							variant="outlined"
							required
							className="register_textField"
						/>
						<TextField
							id="standard-basic"
							label="Email Address"
							variant="outlined"
							required
							className="register_textField"
						/>
						<TextField
							id="standard-basic"
							label="Password"
							variant="outlined"
							required
							className="register_textField"
						/>
						<TextField
							id="standard-basic"
							label="Confirm Password"
							variant="outlined"
							required
							className="register_textField"
						/>

						<Button
							variant="contained"
							className="register_dataButton"
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
