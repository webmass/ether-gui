import './App.css';

import Web3Modal from "web3modal";
import { Contract, ethers } from 'ethers';
import etherGUI from 'ether-gui';
import { useEffect, useState } from 'react';

import 'semantic-ui-css/semantic.min.css'

import ContractExample from './contracts/ExampleContract.json';
import NetworkWarning from './components/NetworkWarning';
import ExampleContractUI from './components/ExampleContractUI';

const SUPPORTED_NET = '4';
const CONTRACT_ADDRESS = ContractExample.networks[SUPPORTED_NET].address;

const providerOptions = {
  /* See Provider Options Section */
};

const handleProvider = async (proxyProvider) => {
  const Web3Provider = new ethers.providers.Web3Provider(proxyProvider);
  const signer = Web3Provider?.getSigner();
  const network = await Web3Provider?.getNetwork();
  return [Web3Provider, await signer?.getAddress(), network?.chainId?.toString()];
}

function App() {
  const [provider, setProvider] = useState();
  const [signerAddress, setSignerAddress] = useState('');
  const [contract, setContract] = useState();
  const [chainId, setChainId] = useState(window.ethereum?.networkVersion);

  const onConnectionSuccess = (Web3Provider, owner, chainId) => {
    setProvider(Web3Provider);
    setSignerAddress(owner);
    setChainId(chainId);

    Web3Provider.provider.on('accountsChanged', async () => {
      const signer = Web3Provider?.getSigner();
      setSignerAddress(await signer?.getAddress());
    });

    Web3Provider.provider.on('chainChanged', async () => {
      window.location.reload();
    });
  }

  useEffect(() => {
    let isMounted = true;
    
    const init = async () => {
      /* Global ether-gui Preferences, not required */
      // etherGUI.init({
      //   preferences: {
      //     styles: {},
      //     wording: {},
      //   }
      // });

      const web3Modal = new Web3Modal({
        disableInjectedProvider: false,
        cacheProvider: true,
      });

      if (web3Modal.cachedProvider) {
        const provider = await web3Modal.connect();
        const [Web3Provider, owner, chainId] = await handleProvider(provider);

        if (!isMounted) { return }

        onConnectionSuccess(Web3Provider, owner, chainId);
      }
    }

    init();

    return () => {
      isMounted = false;
    }
  }, []);

  useEffect(() => {
    const signer = provider?.getSigner();
    updateContract(signer);
  }, [provider, signerAddress]);

  const updateContract = (signer) => {
    const contract = new Contract(CONTRACT_ADDRESS, ContractExample.abi, signer);
    setContract(contract);
  }

  const connect = async () => {
    if (signerAddress) { return }

    const web3Modal = new Web3Modal({
      network: "mainnet", // optional
      cacheProvider: true, // optional
      providerOptions // required
    });

    const provider = await web3Modal.connect();
    const [Web3Provider, owner, chainId] = await handleProvider(provider);
    
    onConnectionSuccess(Web3Provider, owner, chainId);
  }

  return (
    <div className="App">
      <header className="App-header">
        <button className="App-header-btn" onClick={connect}>
          {
            signerAddress || 'Connect'
          }
        </button>
      </header>
      <div className="App-body">
        {chainId && chainId !== SUPPORTED_NET ? <NetworkWarning /> : null}
        <ExampleContractUI contract={contract} />
      </div>
    </div>
  );
}

export default App;
