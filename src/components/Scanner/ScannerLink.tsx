import { ScannerLinkProps } from '../../types';
import useScanner from '../../hooks/useScanner';
import { formatAddr } from '../../utils';
import { BLOCK_SCAN } from '../../constants';

const ScannerLink = ({
	value,
	type = 'address',
	shorten = true,
	children,
	label,
	netId,
	scanUrl = '',
	useBlockScan = false,
}: ScannerLinkProps
) => {
	const netScanner = useScanner(netId);
	const scannerUrl = scanUrl || (useBlockScan ? BLOCK_SCAN : netScanner);
	const address = value || children?.toString() || '';
	const content = label || (shorten && (!children || typeof children === 'string') ? formatAddr(address) : children||value);

	return (
		<a
			href={`${scannerUrl}/${type}/${address}`}
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
