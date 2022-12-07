import Button from 'components/Button';
import { selectWeb3 } from 'features/web3/web3Slice';
import { useAppSelector } from 'hooks';
import useWeb3 from 'hooks/useWeb3';

const Header = () => {
  const { connect, disconnect } = useWeb3();
  const { address } = useAppSelector(selectWeb3);

  return (
    <header id="header">
      Header
      <Button onClick={address ? disconnect : connect}>
        {address ? 'Disconnect' : 'Connect'} Wallet
      </Button>
    </header>
  );
};

export default Header;
