import Footer from 'components/Footer';
import Header from 'components/Header';

type Props = {} & React.HTMLAttributes<HTMLElement>;

const Layout: React.FC<Props> = ({ className, children }) => {
  return (
    <div className={`app${className ? ` ${className}` : ''}`}>
      <Header />
      <main id="container">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
