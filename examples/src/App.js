import './App.css';

import Web3Modal from "web3modal";
import { Contract, ethers } from 'ethers';
import etherGUI from 'ether-gui';
import { useEffect, useState } from 'react';

import 'semantic-ui-css/semantic.min.css'

import ContractExample from './contracts/ExampleContract.json';
import NetworkWarning from './components/NetworkWarning';
import ExampleContractUI from './components/ExampleContractUI';

const SUPPORTED_NET = '3';
const CONTRACT_ADDRESS = ContractExample.networks[SUPPORTED_NET].address;

const providerOptions = {
  /* See Provider Options Section */
};

function App() {
  const [provider, setProvider] = useState();
  const [signerAddress, setSignerAddress] = useState('');
  const [contract, setContract] = useState();
  const [netVersion, setNetVersion] = useState(window.ethereum?.networkVersion);

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
        const [Web3Provider, signerAddress] = await handleProvider(provider);

        if (!isMounted) { return }

        setProvider(Web3Provider);
        setSignerAddress(signerAddress);
        setNetVersion(provider?.networkVersion);

        provider.on('accountsChanged', async () => {
          const signer = Web3Provider?.getSigner();
          setSignerAddress(await signer?.getAddress());
        });

        provider.on('chainChanged', async () => {
          window.location.reload();
        });
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

  const handleProvider = async (proxyProvider) => {
    const Web3Provider = new ethers.providers.Web3Provider(proxyProvider);
    const signer = Web3Provider?.getSigner();
    return [Web3Provider, await signer?.getAddress()];
  }

  const connect = async () => {
    if(signerAddress) { return }

    const web3Modal = new Web3Modal({
      network: "mainnet", // optional
      cacheProvider: true, // optional
      providerOptions // required
    });

    const provider = await web3Modal.connect();
    const [Web3Provider, owner] = await handleProvider(provider);
    setProvider(Web3Provider);
    setSignerAddress(owner);
    setNetVersion(provider?.networkVersion)
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
        { netVersion !== SUPPORTED_NET && signerAddress ? <NetworkWarning /> : null }
        <ExampleContractUI contract={contract} />
      </div>
    </div>
  );
}

export default App;
