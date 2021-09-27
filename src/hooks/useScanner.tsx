import { useEffect, useState } from 'react';
import { getScanner }   from '../utils';

export default function useScanner(netId?: string): string {
	const [scanner, setScanner] = useState(getScanner(netId || window.ethereum?.networkVersion));

	useEffect(() => {
		const scan = getScanner(netId || window.ethereum?.networkVersion);
		setScanner(scan);
	}, [netId]);

	return scanner;
}
