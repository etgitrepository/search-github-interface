import { useEffect, useState } from 'react';
import { useDebounce } from '../../../../shared/hooks/useDebounce';
import { Input } from '@mui/material';

interface RepositorySearchProps {
	setQuery: (query: string) => void;
}

export const RepositorySearch = ({ setQuery }: RepositorySearchProps) => {
	const [value, setValue] = useState('');
	const debouncedValue = useDebounce(value, 300);

	useEffect(() => {
		setQuery(debouncedValue);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [debouncedValue]);

	return (
		<Input
			fullWidth
			placeholder="Search repository..."
			value={value}
			onChange={(e) => setValue(e.target.value)}
		/>
	);
};
