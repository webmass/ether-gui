const NetworkWarning = () => {
    const switchNetwork = async () => {
        try {
            await window?.ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: '0x3' }],
            });
        } catch (switchError) {
            console.log(switchError);
        }
    }

    return <div style={{ margin: '1rem 0' }}>
        ❌ Wrong Network, please use <a href="#warning" style={{ cursor: 'pointer' }} onClick={switchNetwork}>Ropsten</a> 🙂
    </div>;
}

export default NetworkWarning;