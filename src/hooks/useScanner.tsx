import { useEffect, useState } from 'react';
import { getScanner }   from '../utils';
import useNetwork from './useNetwork';

export default function useScanner(netId?: string): string {
	const network = useNetwork();
	const [scanner, setScanner] = useState(getScanner(netId || network));

	useEffect(() => {
		const scan = getScanner(netId || network);
		setScanner(scan);
	}, [netId, network]);

	return scanner;
}
