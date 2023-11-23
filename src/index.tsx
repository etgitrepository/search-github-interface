import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RepositoryContainer } from './features/repository';
import { FavoritesContainer, FavoritesProvider } from './features/favorites';

const router = createBrowserRouter([
	{
		path: '/',
		element: <RepositoryContainer />,
	},
	{
		path: '/favorites',
		element: <FavoritesContainer />,
	},
]);

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
		},
	},
});

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement,
);

root.render(
	<React.StrictMode>
		<QueryClientProvider client={queryClient}>
			<ThemeProvider theme={createTheme({})}>
				<FavoritesProvider>
					<RouterProvider router={router} />
				</FavoritesProvider>
			</ThemeProvider>
		</QueryClientProvider>
	</React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
