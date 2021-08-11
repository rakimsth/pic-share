import React, { useState, useReducer, useEffect, useCallback, createContext } from 'react';

// WEB3 CONNECTION PACKAGES
import Web3 from 'web3';
import Web3Modal from 'web3modal';
// import WalletConnectProvider from "@walletconnect/web3-provider";
import Web3Reducer from './reducer';

// import { ERC20_ABI, OLD_IAG_ADDRESS, SWAPPER_ADDRESS, SWAPPER_ABI } from './constants';

import notify from '../../utils/notify';

import history from '../../utils/history';

let web3;

const initialState = {
  loading: true,
  account: null,
  networkId: null,
  contracts: {
    token: null,
  },
};

export const Web3Context = createContext(initialState);

export const Web3Provider = ({ children }) => {
  const [state, dispatch] = useReducer(Web3Reducer, initialState);

  const { account, contracts } = state;

  // STATE MANAGEMENT
  const setAccount = (acc) => {
    dispatch({
      type: 'SET_ACCOUNT',
      payload: acc,
    });
  };

  const setContracts = (newContracts) => {
    dispatch({
      type: 'SET_CONTRACTS',
      payload: newContracts,
    });
  };

  const setNetworkId = (networkId) => {
    dispatch({
      type: 'SET_NETWORK_ID',
      payload: networkId,
    });
  };

  const setProtocol = async (accounts) => {
    setAccount(accounts[0]);

    // Contract Instances
    // TOOD create contract instances

    // window.token = new web3.eth.Contract(ERC20_ABI, OLD_IAG_ADDRESS, {
    //   from: accounts[0],
    // });

    // setContracts({
    //   swapper: window.swapper,
    // });
  };

  // === HELPERS === //
  const logout = () => {
    dispatch({
      type: 'CLEAR_STATE',
      payload: initialState,
    });
    localStorage.setItem('WEB3_CONNECT_CACHED_PROVIDER', null);
    history.push('/');
  };
  const toWei = (value) => web3.utils.toWei(String(value));
  const fromWei = (value) => Number(web3.utils.fromWei(String(value)));
  const toBN = (value) => new web3.utils.BN(String(value));

  // === MAIN FUNCTIONS === //

  // Connect Web3 wallet and set state (contracts, roles, account)
  const connectWeb3 = useCallback(async () => {
    // Web3 Modal
    const providerOptions = {
      // walletconnect: {
      //   package: WalletConnectProvider, // required
      //   options: {
      //     infuraId: "36bbdc3ed5bd449fad0374a2e07b850a", // required
      //   },
      // },
    };

    try {
      const web3Modal = new Web3Modal({
        network: 'mainnet', // optional
        cacheProvider: true, // optional
        providerOptions, // required
        theme: 'light',
      });

      const provider = await web3Modal.connect();

      web3 = new Web3(provider);
      window.web3 = web3;

      const accs = await web3.eth.getAccounts();
      await setProtocol(accs);
      console.log('Connected Account: ', accs[0]);

      const networkId = await web3.givenProvider.networkVersion;
      console.log(networkId);
      setNetworkId(networkId);
      // if (Number(networkId) !== 1) {
      //   // alert("Please connect to etherum mainnet network");
      //   history.push('/');
      //   return;
      // }

      notify('success', 'connected web3 wallet', 1500);

      window.ethereum.on('chainChanged', () => {
        document.location.reload();
      });

      // If accounts change
      window.ethereum.on('accountsChanged', (accounts) => {
        setProtocol(accounts);
      });
    } catch (error) {
      notify('error', 'Could not connect to web3!');
      // console.log(error.message);
    }
  }, []);

  const getBalances = async () => {
    try {
      const balanceIAG = await contracts.token.methods.balanceOf(account).call();
      const balanceETH = await web3.eth.getBalance(account);

      return { ETH: fromWei(balanceETH), IAG: fromWei(balanceIAG) };
    } catch (error) {
      notify('error', error.message);
      console.log(error.message);
      return error;
    }
  };

  const swapToken = async (amount) => {
    try {
      const swappingTx = await contracts.swapper.methods.SwapNow(amount).send({ from: account });

      return swappingTx;
    } catch (error) {
      notify('error', error.message);
      console.log(error.message);
      return error;
    }
  };

  // Connect web3 on app load
  useEffect(() => {
    connectWeb3();
  }, [connectWeb3]);

  return (
    <Web3Context.Provider
      value={{
        ...state,
        connectWeb3,
        logout,
        toWei,
        fromWei,
        toBN,
        getBalances,
        swapToken,
      }}
    >
      {children}
    </Web3Context.Provider>
  );
};
