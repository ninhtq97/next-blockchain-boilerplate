import Button from 'components/Button';
import useWeb3 from 'hooks/useWeb3';

const Header = () => {
  const { connect } = useWeb3();

  return (
    <header id="header">
      Header
      <Button onClick={connect}>Connect</Button>
    </header>
  );
};

export default Header;
