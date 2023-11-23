import { useContext } from 'react';
import { favoritesContext } from '../../context/favorites-provider';
import {
	Button,
	Paper,
	Rating,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Typography,
} from '@mui/material';
import { MainLayoutContainer } from '../../../main-layout';
import { FAVORITES_ACTION_TYPES } from '../../types';
import { RepositoryData } from '../../../repository';

export const FavoritesContainer = () => {
	const { state, dispatch } = useContext(favoritesContext);

	const repos = state.savedRepos;

	const onEvaluationChange = (repoId: string, evaluation: number | null) => {
		dispatch({
			type: FAVORITES_ACTION_TYPES.SET_EVALUATION,
			payload: {
				id: repoId,
				evaluation: evaluation || undefined,
			},
		});
	};

	const onRemoveClick = (repo: RepositoryData) => {
		dispatch({
			type: FAVORITES_ACTION_TYPES.REMOVE_FAVORITE,
			payload: repo,
		});
	};

	return (
		<MainLayoutContainer>
			<Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
				Favorites
			</Typography>
			{repos.length === 0 && (
				<Typography>No repositories saved as favorites.</Typography>
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
								<TableCell />
							</TableRow>
						</TableHead>
						<TableBody>
							{repos.map((row) => {
								if (!row) return null;

								return (
									<TableRow
										key={row.id}
										sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
									>
										<TableCell>{row.name}</TableCell>
										<TableCell>{row.stars}</TableCell>
										<TableCell>{row.forks}</TableCell>
										<TableCell>
											<Rating
												name="simple-controlled"
												value={row.evaluation}
												onChange={(event, newValue) => {
													onEvaluationChange(row.id, newValue);
												}}
											/>
										</TableCell>
										<TableCell>
											<Button onClick={() => onRemoveClick(row)}>Remove</Button>
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
