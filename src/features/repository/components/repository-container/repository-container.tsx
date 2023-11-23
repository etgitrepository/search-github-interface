import {
	Box,
	CircularProgress,
	IconButton,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Typography,
} from '@mui/material';
import { RepositorySearch } from '../repository-search/RepositorySearch';
import { useContext, useState } from 'react';
import { useSearchRepositories } from '../../../../data';
import { mapRepositoriesData } from './utils/map-repositories-data';
import { Favorite, FavoriteBorderOutlined } from '@mui/icons-material';
import { favoritesContext } from '../../../favorites';
import { RepositoryData } from '../../types';
import { FAVORITES_ACTION_TYPES } from '../../../favorites/types';
import { MainLayoutContainer } from '../../../main-layout';

export const RepositoryContainer = () => {
	const [query, setQuery] = useState('');
	const { data, isLoading } = useSearchRepositories({
		query,
	});
	const favorites = useContext(favoritesContext);

	const handleQueryChange = (query: string) => {
		setQuery(query);
	};

	const handleFavoriteClick = (repo: RepositoryData, isFavorite: boolean) => {
		favorites.dispatch({
			type: isFavorite
				? FAVORITES_ACTION_TYPES.REMOVE_FAVORITE
				: FAVORITES_ACTION_TYPES.ADD_FAVORITE,
			payload: repo,
		});
	};

	const repos = mapRepositoriesData(data);

	return (
		<MainLayoutContainer>
			<Typography variant="h4" gutterBottom>
				Search
			</Typography>
			<Box sx={{ mt: 4 }}>
				<RepositorySearch setQuery={handleQueryChange} />
			</Box>
			{isLoading && (
				<Box sx={{ display: 'flex', mt: 4, justifyContent: 'center' }}>
					<CircularProgress />
				</Box>
			)}
			{!!repos.length && (
				<TableContainer component={Paper} sx={{ mt: 4 }}>
					<Table sx={{ minWidth: 650 }} aria-label="simple table">
						<TableHead>
							<TableRow>
								<TableCell>Name</TableCell>
								<TableCell>Stars</TableCell>
								<TableCell>Forks</TableCell>
								<TableCell />
							</TableRow>
						</TableHead>
						<TableBody>
							{repos.map((row) => {
								if (!row) return null;

								const isFavorite = favorites.state.savedRepos.some(
									(item) => item.id === row.id,
								);

								return (
									<TableRow
										key={row.id}
										sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
									>
										<TableCell>{row.name}</TableCell>
										<TableCell>{row.stars}</TableCell>
										<TableCell>{row.forks}</TableCell>
										<TableCell>
											<IconButton
												aria-label="toggle favorite"
												color="primary"
												onClick={() => handleFavoriteClick(row, isFavorite)}
											>
												{isFavorite ? <Favorite /> : <FavoriteBorderOutlined />}
											</IconButton>
										</TableCell>
									</TableRow>
								);
							})}
						</TableBody>
					</Table>
				</TableContainer>
			)}
		</MainLayoutContainer>
	);
};
