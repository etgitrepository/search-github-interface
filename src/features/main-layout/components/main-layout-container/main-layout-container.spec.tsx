import { render, screen } from '@testing-library/react';
import { MainLayoutContainer } from './main-layout-container';
import { MemoryRouter } from 'react-router-dom';

describe('MainLayoutContainer', () => {
	const setup = (children = 'some-text') => {
		return render(
			<MemoryRouter>
				<MainLayoutContainer>{children}</MainLayoutContainer>
			</MemoryRouter>,
		);
	};

	it('will render content passed as children', () => {
		setup();
		expect(screen.getByText('some-text')).toBeInTheDocument();
	});

	it('will render search link', () => {
		setup();
		expect(screen.getByRole('link', { name: 'Search' })).toHaveAttribute(
			'href',
			'/',
		);
	});

	it('will render favorites link', () => {
		setup();
		expect(screen.getByRole('link', { name: 'Favorites' })).toHaveAttribute(
			'href',
			'/favorites',
		);
	});
});
