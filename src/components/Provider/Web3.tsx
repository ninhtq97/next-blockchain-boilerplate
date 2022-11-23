import { initWeb3, Web3Context } from 'contexts';
import { useState } from 'react';

const Web3Provider = ({ children }) => {
  const [web3, setWeb3] = useState(initWeb3);

  return (
    <Web3Context.Provider value={{ ...web3, setWeb3 }}>
      {children}
    </Web3Context.Provider>
  );
};

export default Web3Provider;
