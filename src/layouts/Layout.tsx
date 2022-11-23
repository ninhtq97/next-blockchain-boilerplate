type Props = {} & React.HTMLAttributes<HTMLElement>;

const Layout: React.FC<Props> = ({ className, children }) => {
  return (
    <div className={`app${className ? ` ${className}` : ''}`}>{children}</div>
  );
};

export default Layout;
