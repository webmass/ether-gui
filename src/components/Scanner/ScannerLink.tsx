import { ScannerLinkProps } from '../../types';
import useScanner from '../../hooks/useScanner';
import { formatAddr } from '../../utils';

const ScannerLink = ({
	value,
	type = 'address',
	shorten = true,
	children,
	label,
	netId,
}: ScannerLinkProps
) => {
	const scanner = useScanner(netId);
	const address = value || children?.toString() || '';
	const content = label || (shorten && (!children || typeof children === 'string') ? formatAddr(address) : children||value);

	return (
		<a
			href={`${scanner}/${type}/${address}`}
			target="_blank"
			rel="noreferrer"
			title={address}
			style={{ textDecoration: 'none' }}
		>
			{content}
		</a>
	)
};

export default ScannerLink;
