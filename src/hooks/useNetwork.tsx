import { useEffect, useState } from 'react';
import { toDecimals } from '../utils';

export default function useNetwork(netId?: string): string {
	const [network, setNetwork] = useState<string>(netId || window.ethereum?.networkVersion);

	useEffect(() => {
		let isMounted = false;
		window.ethereum?.on('chainChanged', (hex: string) => {
			if(!isMounted || netId) { return }
			const dec = toDecimals(hex)
			setNetwork(dec.toString());
		});
		return () => {
			isMounted = false;
		};
	}, [netId]);

	return network;
}
