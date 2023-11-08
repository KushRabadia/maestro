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
							sx={{ borderRadius: 0, opacity: 0.5 }}
						/>
						<TextField
							id="standard-basic"
							label="Password..."
							variant="outlined"
							required
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
