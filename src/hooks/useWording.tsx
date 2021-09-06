import { useEffect, useState, useRef } from 'react';
import { Wording } from '../types';
import { getWording, wording$ } from '../config';

export default function useWording(options?: Partial<Wording>): Wording {
	const isMountedRef = useRef(true);
	const [defaults, setDefaults] = useState<Wording>(getWording());
	const [wording, setWording] = useState<Wording>({ ...defaults, ...options });

	useEffect(() => {
		setWording({ ...defaults, ...options });
	}, [options, defaults]);

	useEffect(() => {
		const sub = wording$.subscribe(setDefaults);
		return () => {
			if(isMountedRef.current) {
				isMountedRef.current = false;
				sub.unsubscribe();
			}
		};
	}, []);

	return wording;
}
