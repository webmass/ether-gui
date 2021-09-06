import { useEffect, useState, useRef, useCallback } from 'react';
import { CSSInterpolation, css } from '@emotion/css';
import { getStyles, customStyles$ } from '../config';
import { StyledComponentsName } from '../types';

export default function useCustomStyles(componentName: StyledComponentsName, defaultClassName = ''): string {
	const isMountedRef = useRef(true);
	const [defaultStyles, setDefaultStyles] = useState(getStyles());

	const getClassName = useCallback((customStyle: CSSInterpolation) => {
		return defaultClassName + (customStyle ? ` ${css(customStyle)}` : '');
	}, [defaultClassName]);

	const [style, setStyle] = useState<string>(getClassName(defaultStyles[componentName]));

	useEffect(() => {
		const sub = customStyles$.subscribe(setDefaultStyles);
		return () => {
			if(isMountedRef.current) {
				sub.unsubscribe();
				isMountedRef.current = false;
			}
		};
	}, []);

	useEffect(() => {
		setStyle(getClassName(defaultStyles[componentName]));
	}, [componentName, defaultClassName, defaultStyles, getClassName]);

	return style;
}
