import { Box, Container, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

export const MainLayoutContainer = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	return (
		<Container sx={{ py: 10 }} maxWidth="lg">
			<Box sx={{ mb: 4, display: 'flex', alignItems: 'center' }}>
				<Link component={RouterLink} to="/">
					Search
				</Link>
				<Link component={RouterLink} to="/favorites" sx={{ ml: 4 }}>
					Favorites
				</Link>
			</Box>
			<Box>{children}</Box>
		</Container>
	);
};
