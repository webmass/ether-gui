import { css } from '@emotion/css';

const wrapperClass = css`
    margin: 1rem 0;
`

const linkClass = css`
    cursor: pointer;
    color: darkblue;
    text-decoration: underline;
`

const NetworkWarning = () => {
    const switchNetwork = async () => {
        try {
            await window?.ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: '0x4' }],
            });
        } catch (switchError) {
            console.log(switchError);
        }
    }

    return <div className={wrapperClass}>
        ❌ Wrong Network, please use <span className={linkClass} onClick={switchNetwork}>Rinkeby</span> 🙂
    </div>;
}

export default NetworkWarning;